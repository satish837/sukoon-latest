/**
 * @type {import('gatsby').GatsbyConfig}
 */

// Strapi API configuration - can be overridden with environment variables
const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL || "https://sukoon-faq.onrender.com/",
  accessToken:
    process.env.STRAPI_ACCESS_TOKEN ||
    "8eef56e86a4d863a33d547da01f057e63aefc8853419a80e50412b127dc7ff2855ab2ad757ecc60952760f2c227609694c7fbf8d97a7ea81f48d0201d63ba39a3ee7e9f52683807d9e49488e9a0051f9127ece4555e14dc46b178a195a3e59c32658546e3955df82bc1188e3769d12879e5ecdd732fa03a2ef954b2f05b94a88",
  collectionTypes: [
    "team-member",
    "blog",
    "post",
    {
      singularName: "seo",
      queryParams: {
        populate: {
          title: "*",
          url: "*",
          seo: {
            populate: "*",
          },
        },
      },
    },
  ],
  queryLimit: 1000,
};

module.exports = {
  siteMetadata: {
    title: "Sukoon",
    siteUrl: "https://sukoonhealth.com/",
    description:
      "Sukoon Health is one of India’s most premium mental health institutions, focused on rehabilitation, psychiatric care and mental health treatments. Connect with us!",
  },
  flags: {
    DEV_SSR: true,
  },
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-no-sourcemaps",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.svg",
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: strapiConfig,
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `
          {
            allStrapiBlog {
              edges {
                node {
                  Slug
                  id
                  knowledge_centre
                }
              }
            }
            allSitePage {
              edges {
                node {
                  id
                  path
                }
              }
            }
          }
        `,
        mapping: {
          allStrapiBlog: {
            sitemap: `post`,
            serializer: (edges) => {
              const urls = edges.map((edge) => ({
                node: {
                  url: edge.node.knowledge_centre
                    ? `/video/${edge.node.Slug}/`
                    : `/blog/${edge.node.Slug}/`,
                  id: `SitePage /${edge.node.Slug}`,
                  slug: edge.node.knowledge_centre
                    ? `/video/${edge.node.Slug}`
                    : `/blog/${edge.node.Slug}`,
                  path: edge.node.knowledge_centre
                    ? `/video/${edge.node.Slug}`
                    : `/blog/${edge.node.Slug}`,
                  lastmod: new Date().toISOString(),
                  priority: "0.6",
                  changefreq: "weekly",
                },
              }));
              return urls;
            },
          },
          allSitePage: {
            sitemap: `page`,
            serializer: (edges) => {
              // Filter out blog and video pages (they're in post sitemap)
              // Also exclude 404, dev-404, and other system pages
              const filteredEdges = edges.filter(
                (edge) =>
                  !edge.node.path.startsWith("/blog/") &&
                  !edge.node.path.startsWith("/video/") &&
                  !edge.node.path.startsWith("/dev-404-page/") &&
                  edge.node.path !== "/404/" &&
                  edge.node.path !== "/404.html"
              );
              
              // Define priority and changefreq based on page importance
              const getPriority = (path) => {
                if (path === "/") return "1.0";
                if (path.includes("/psychiatrist-") || path.includes("/psychiatric-hospital-") || path.includes("/rehabilitation-centre-")) return "0.9";
                if (path.includes("/psychiatric-services/") || path.includes("/rehabilitation-services/") || path.includes("/mental-health-consultation/")) return "0.8";
                return "0.7";
              };
              
              const getChangefreq = (path) => {
                if (path === "/") return "daily";
                if (path.includes("/psychiatrist-") || path.includes("/psychiatric-hospital-") || path.includes("/rehabilitation-centre-")) return "weekly";
                return "monthly";
              };
              
              const newurls = filteredEdges.map((edge) => ({
                node: {
                  url: edge.node.path.endsWith("/")
                    ? edge.node.path
                    : `${edge.node.path}/`,
                  id: edge.node.id,
                  slug: edge.node.path,
                  lastmod: new Date().toISOString(),
                  priority: getPriority(edge.node.path),
                  changefreq: getChangefreq(edge.node.path),
                },
              }));
              return newurls;
            },
          },
        },
        createLinkInHead: true,
        addUncaughtPages: true,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
