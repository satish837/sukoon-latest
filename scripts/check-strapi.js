#!/usr/bin/env node

/**
 * Pre-build script to check if Strapi API is available
 * This helps prevent build failures when Strapi service is sleeping (e.g., on Render free tier)
 */

const https = require('https');
const http = require('http');

const STRAPI_URL = process.env.STRAPI_API_URL || 'https://sukoon-faq.onrender.com';
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

function checkStrapiHealth(url, retries = MAX_RETRIES) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const healthCheckUrl = `${url}/api/blogs?pagination[pageSize]=1`;

    console.log(`Checking Strapi API at ${healthCheckUrl}...`);

    const req = client.get(healthCheckUrl, (res) => {
      if (res.statusCode === 200 || res.statusCode === 401) {
        // 401 is OK - it means the API is responding (just needs auth)
        console.log('✓ Strapi API is available');
        resolve(true);
      } else if (res.statusCode >= 500 && retries > 0) {
        // Server error - retry
        console.log(`✗ Strapi API returned ${res.statusCode}, retrying in ${RETRY_DELAY/1000}s... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        setTimeout(() => {
          checkStrapiHealth(url, retries - 1).then(resolve).catch(reject);
        }, RETRY_DELAY);
      } else {
        console.log(`✗ Strapi API returned ${res.statusCode}`);
        reject(new Error(`Strapi API returned status ${res.statusCode}`));
      }
    });

    req.on('error', (err) => {
      if (retries > 0) {
        console.log(`✗ Connection error: ${err.message}, retrying in ${RETRY_DELAY/1000}s... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        setTimeout(() => {
          checkStrapiHealth(url, retries - 1).then(resolve).catch(reject);
        }, RETRY_DELAY);
      } else {
        console.log(`✗ Failed to connect to Strapi API after ${MAX_RETRIES} retries`);
        reject(err);
      }
    });

    req.setTimeout(10000, () => {
      req.destroy();
      if (retries > 0) {
        console.log(`✗ Request timeout, retrying in ${RETRY_DELAY/1000}s... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
        setTimeout(() => {
          checkStrapiHealth(url, retries - 1).then(resolve).catch(reject);
        }, RETRY_DELAY);
      } else {
        reject(new Error('Request timeout'));
      }
    });
  });
}

// Run the check
checkStrapiHealth(STRAPI_URL)
  .then(() => {
    console.log('Strapi API check passed. Proceeding with build...');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Strapi API check failed:', err.message);
    console.error('\n⚠️  WARNING: Strapi API is not available.');
    console.error('The build may fail if Strapi data is required.');
    console.error('Please ensure the Strapi service is running and accessible.');
    console.error('\nIf using Render free tier, the service may be sleeping.');
    console.error('Consider upgrading to a paid plan or using a service that stays awake.');
    // Don't fail the build - just warn
    // Uncomment the next line if you want to fail the build when Strapi is unavailable:
    // process.exit(1);
    process.exit(0);
  });

