const path = require("path");
const fs = require("fs");

// Fix localFile___NODE fields that contain comma-separated IDs instead of arrays
// This is a known issue with gatsby-source-strapi when handling multiple media files
exports.onCreateNode = ({ node }) => {
  // Check if node has localFile___NODE field that's a string (comma-separated)
  if (node.localFile___NODE && typeof node.localFile___NODE === "string") {
    // Check if it contains commas (indicating multiple IDs)
    if (node.localFile___NODE.includes(",")) {
      // Split comma-separated IDs into an array
      const ids = node.localFile___NODE
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
      
      // Convert to array format that Gatsby expects
      // For single item, keep as string; for multiple, use array
      if (ids.length > 0) {
        node.localFile___NODE = ids.length === 1 ? ids[0] : ids;
      } else {
        // If empty after filtering, remove the field
        delete node.localFile___NODE;
      }
    }
  }

  // Recursively check nested fields that might have the same issue
  const fixLocalFileFields = (obj) => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return;
    
    for (const key in obj) {
      if (key.includes("localFile") && key.includes("___NODE")) {
        if (typeof obj[key] === "string" && obj[key].includes(",")) {
          const ids = obj[key]
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean);
          
          if (ids.length > 0) {
            obj[key] = ids.length === 1 ? ids[0] : ids;
          } else {
            // Set to null instead of deleting to avoid mutation issues
            obj[key] = null;
          }
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        fixLocalFileFields(obj[key]);
      }
    }
  };

  fixLocalFileFields(node);
};

// Intercept page creation to handle redirects for pages with capital letters
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, createRedirect } = actions;

  // Handle psychiatric-treatment-in-India redirect
  // Create the page at lowercase path and set up redirects
  if (page.path === "/mental-health-consultation/psychiatric-treatment-in-India/") {
    const newPath = "/mental-health-consultation/psychiatric-treatment-in-india/";
    
    // Create a new page at the lowercase path with all original properties
    createPage({
      ...page,
      path: newPath,
    });

    // Create redirects from old path to new path (for production builds)
    createRedirect({
      fromPath: "/mental-health-consultation/psychiatric-treatment-in-India/",
      toPath: "/mental-health-consultation/psychiatric-treatment-in-india/",
      isPermanent: true,
    });
    createRedirect({
      fromPath: "/mental-health-consultation/psychiatric-treatment-in-India",
      toPath: "/mental-health-consultation/psychiatric-treatment-in-india/",
      isPermanent: true,
    });
  }
};

// Define a template for blog post
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;
  const blogtemplate = path.resolve("./src/components/articleDetails/index.js");
  const posttemplate = path.resolve("./src/components/postDetail/index.js");
  // const experttemplate = path.resolve("./src/pages/index.js");
  const result = await graphql(
    `
      {
        allStrapiBlog {
          nodes {
            Slug
            id
            title
            knowledge_centre
            content {
              data {
                content
              }
            }
          }
        }
        allStrapiPost {
          nodes {
            Slug
            id
            title
            content {
              data {
                content
              }
            }
          }
        }
        allStrapiSeo {
          nodes {
            seo {
              metaTitle
              metaImage {
                url
              }
              metaDescription
              keywords
              metaViewport
            }
            title
            url
          }
        }
      }
    `
  );

  // Handle errors gracefully - don't fail build if Strapi is unavailable
  if (result.errors) {
    reporter.warn(
      "Warning: There was an error loading Strapi articles. Building with empty data."
    );
    reporter.warn(result.errors);
    // Continue with empty arrays instead of failing
  }

  // Safely extract data, defaulting to empty arrays if data is missing
  const blog = result.data?.allStrapiBlog?.nodes || [];
  const posts = result.data?.allStrapiPost?.nodes || [];
  const seoDatas = result.data?.allStrapiSeo?.nodes || [];

  // const seo = result.data.allStrapiSeo.nodes;
  // const experts = result.data.allStrapiTeamMember.nodes;
  if (blog.length > 0) {
    blog.forEach((articleItem) => {
      let seo = seoDatas.filter(
        (item) =>
          item.url === `https://sukoonhealth.com/blog/${articleItem.Slug}/`
      );
      let staticSeo = {
        title: "Sukoon Health",
        url: `https://sukoonhealth.com/blog/${articleItem.Slug}/`,
        seo: {
          metaTitle: "Sukoon Health",
          metaDescription: "Sukoon Health Blog",
          keywords: "Sukoon Health",
          metaImage: {
            url: "https://sukoonhealth.com/static/efd3d9e26b744ff3fcf665be2c370692/22283/mbllogo.webp",
          },
          metaViewport: "width=device-width, initial-scale=1.0",
        },
      };
      let pageSeo = seo.length > 0 ? seo[0] : staticSeo;

      createPage({
        path: `/blog/${articleItem.Slug}`,
        component: blogtemplate,
        context: {
          slug: articleItem.Slug,
          seo: pageSeo,
        },
      });
      if (articleItem.knowledge_centre) {
        createPage({
          path: `/video/${articleItem.Slug}`,
          component: blogtemplate,
          context: {
            slug: articleItem.Slug,
            seo: pageSeo,
          },
        });
      }
    });
  }
  if (posts.length > 0) {
    posts.forEach((articleItem) => {
      createPage({
        path: `/mediapost/${articleItem.Slug}`,
        component: posttemplate,
        context: {
          slug: articleItem.Slug,
        },
      });
    });
  }
  // if (experts.length > 0) {
  //   experts.forEach((expertItem) => {
  //     createPage({
  //       path: `/${expertItem.Slug}`,
  //       component: experttemplate,
  //       context: {
  //         slug: expertItem.Slug,
  //       },
  //     });
  //   });
  // }

  // Redirect from old route to new route (capital G to lowercase g)
  createRedirect({
    fromPath: `/psychiatric-hospital-in-Gurgaon/`,
    toPath: `/psychiatric-hospital-in-gurgaon/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/psychiatric-hospital-in-Gurgaon`,
    toPath: `/psychiatric-hospital-in-gurgaon/`,
    isPermanent: true,
  });

  // Redirect from psychiatrist-bengaluru to psychiatric-hospital-in-bengaluru
  createRedirect({
    fromPath: `/psychiatrist-bengaluru/`,
    toPath: `/psychiatric-hospital-in-bengaluru/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/psychiatrist-bengaluru`,
    toPath: `/psychiatric-hospital-in-bengaluru/`,
    isPermanent: true,
  });

  // Redirect from psychiatrist-hyderabad to psychiatric-hospital-in-hyderabad
  createRedirect({
    fromPath: `/psychiatrist-hyderabad/`,
    toPath: `/psychiatric-hospital-in-hyderabad/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/psychiatrist-hyderabad`,
    toPath: `/psychiatric-hospital-in-hyderabad/`,
    isPermanent: true,
  });

  // Redirect from weeklyRoutine to weeklyroutine
  createRedirect({
    fromPath: `/weeklyRoutine/`,
    toPath: `/weeklyroutine/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/weeklyRoutine`,
    toPath: `/weeklyroutine/`,
    isPermanent: true,
  });

  // Redirect from blog/rTMS and blog/rtms to blog/what-is-rtms-in-india
  createRedirect({
    fromPath: `/blog/rTMS/`,
    toPath: `/blog/what-is-rtms-in-india/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/rTMS`,
    toPath: `/blog/what-is-rtms-in-india/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/rtms/`,
    toPath: `/blog/what-is-rtms-in-india/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/rtms`,
    toPath: `/blog/what-is-rtms-in-india/`,
    isPermanent: true,
  });

  // Redirect from rehabilitation-services/alcohol-deaddiction/2 to rehabilitation-services/alcohol-deaddiction/
  createRedirect({
    fromPath: `/rehabilitation-services/alcohol-deaddiction/2/`,
    toPath: `/rehabilitation-services/alcohol-deaddiction/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/rehabilitation-services/alcohol-deaddiction/2`,
    toPath: `/rehabilitation-services/alcohol-deaddiction/`,
    isPermanent: true,
  });

  // Redirect from blog/different-types-of-addiction-that-indians-should-know-about-1 to blog/different-types-of-addiction
  createRedirect({
    fromPath: `/blog/different-types-of-addiction-that-indians-should-know-about-1/`,
    toPath: `/blog/different-types-of-addiction/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/different-types-of-addiction-that-indians-should-know-about-1`,
    toPath: `/blog/different-types-of-addiction/`,
    isPermanent: true,
  });

  // Redirect from blog/anorexia-nervosa and blog/anorexia-nervosa-blog to blog/anorexia-nervosa-symptoms-prevention-treatment
  createRedirect({
    fromPath: `/blog/anorexia-nervosa/`,
    toPath: `/blog/anorexia-nervosa-symptoms-prevention-treatment/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/anorexia-nervosa`,
    toPath: `/blog/anorexia-nervosa-symptoms-prevention-treatment/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/anorexia-nervosa-blog/`,
    toPath: `/blog/anorexia-nervosa-symptoms-prevention-treatment/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/anorexia-nervosa-blog`,
    toPath: `/blog/anorexia-nervosa-symptoms-prevention-treatment/`,
    isPermanent: true,
  });

  // Redirect from blog/Bulimia-Nervosa to blog/bulimia-nervosa-treatment-in-india
  createRedirect({
    fromPath: `/blog/Bulimia-Nervosa/`,
    toPath: `/blog/bulimia-nervosa-treatment-in-india/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/Bulimia-Nervosa`,
    toPath: `/blog/bulimia-nervosa-treatment-in-india/`,
    isPermanent: true,
  });

  // Redirect from eating-disorder to blog/eating-disorder-treatment-india
  createRedirect({
    fromPath: `/eating-disorder/`,
    toPath: `/blog/eating-disorder-treatment-india/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/eating-disorder`,
    toPath: `/blog/eating-disorder-treatment-india/`,
    isPermanent: true,
  });

  // Redirect from blog/body-dysmorphic to blog/body-dysmorphic-disorder-in-india
  createRedirect({
    fromPath: `/blog/body-dysmorphic/`,
    toPath: `/blog/body-dysmorphic-disorder-in-india/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/body-dysmorphic`,
    toPath: `/blog/body-dysmorphic-disorder-in-india/`,
    isPermanent: true,
  });

  // Redirect from blog/Understanding-Psychosis-and-Treatment-Methods to blog/understanding-psychosis-causes-and-treatments-india
  createRedirect({
    fromPath: `/blog/Understanding-Psychosis-and-Treatment-Methods/`,
    toPath: `/blog/understanding-psychosis-causes-and-treatments-india/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/Understanding-Psychosis-and-Treatment-Methods`,
    toPath: `/blog/understanding-psychosis-causes-and-treatments-india/`,
    isPermanent: true,
  });

  // Redirect from blog/Obsessive-Compulsive-Disorder-vs-Obsessive-Compulsive-Personality-Disorder to blog/ocd-vs-ocpd-disgnosis-and-treatment-in-India
  createRedirect({
    fromPath: `/blog/Obsessive-Compulsive-Disorder-vs-Obsessive-Compulsive-Personality-Disorder/`,
    toPath: `/blog/ocd-vs-ocpd-disgnosis-and-treatment-in-India/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/Obsessive-Compulsive-Disorder-vs-Obsessive-Compulsive-Personality-Disorder`,
    toPath: `/blog/ocd-vs-ocpd-disgnosis-and-treatment-in-India/`,
    isPermanent: true,
  });

  // Redirect from blog/recognising-the-signs-and-symptoms-of-borderline-personality-disorder to blog/borderline-personality-disorder-symptoms-disgnosis-and-treatment-in-India
  createRedirect({
    fromPath: `/blog/recognising-the-signs-and-symptoms-of-borderline-personality-disorder/`,
    toPath: `/blog/borderline-personality-disorder-symptoms-disgnosis-and-treatment-in-India/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/recognising-the-signs-and-symptoms-of-borderline-personality-disorder`,
    toPath: `/blog/borderline-personality-disorder-symptoms-disgnosis-and-treatment-in-India/`,
    isPermanent: true,
  });

  // Redirect from blog/signs-of-social-media-addiction-and-how-to-manage-it to blog/how-to-manage-social-media-addiction-in-indian-teens
  createRedirect({
    fromPath: `/blog/signs-of-social-media-addiction-and-how-to-manage-it/`,
    toPath: `/blog/how-to-manage-social-media-addiction-in-indian-teens/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/signs-of-social-media-addiction-and-how-to-manage-it`,
    toPath: `/blog/how-to-manage-social-media-addiction-in-indian-teens/`,
    isPermanent: true,
  });

  // Redirect from blog/cbt to blog/cbt-treatment-for-mental-health-in-India
  createRedirect({
    fromPath: `/blog/cbt/`,
    toPath: `/blog/cbt-treatment-for-mental-health-in-India/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/cbt`,
    toPath: `/blog/cbt-treatment-for-mental-health-in-India/`,
    isPermanent: true,
  });

  // Redirect from blogs/signs-of-social-media-addiction-and-how-to-manage-it to blog/how-to-manage-social-media-addiction-in-indian-teens
  createRedirect({
    fromPath: `/blogs/signs-of-social-media-addiction-and-how-to-manage-it/`,
    toPath: `/blog/how-to-manage-social-media-addiction-in-indian-teens/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blogs/signs-of-social-media-addiction-and-how-to-manage-it`,
    toPath: `/blog/how-to-manage-social-media-addiction-in-indian-teens/`,
    isPermanent: true,
  });

  // Redirect from blog/inpatient-vs-outpatient-care-in-India-with-Sukoon to blog/inpatient-vs-outpatient-care-in-india-with-sukoon
  createRedirect({
    fromPath: `/blog/inpatient-vs-outpatient-care-in-India-with-Sukoon/`,
    toPath: `/blog/inpatient-vs-outpatient-care-in-india-with-sukoon/`,
    isPermanent: true,
  });
  createRedirect({
    fromPath: `/blog/inpatient-vs-outpatient-care-in-India-with-Sukoon`,
    toPath: `/blog/inpatient-vs-outpatient-care-in-india-with-sukoon/`,
    isPermanent: true,
  });
};
// exports.onPostBuild = ({ reporter }) => {
// exports.onPostBuild = ({ reporter }) => {
//   const sitemapIndexContent = `
//       <?xml version="1.0" encoding="UTF-8"?>
//       <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         <sitemap>
//           <loc>https://sukoonhealth.com/page-sitemap.xml</loc>
//         </sitemap>
//         <sitemap>
//           <loc>https://sukoonhealth.com/post-sitemap.xml</loc>
//         </sitemap>
//       </sitemapindex>
//     `;

//   const publicPath = path.join(__dirname, "public", "sitemap-index.xml");
//   if (!fs.existsSync(publicPath)) {
//     fs.mkdirSync(publicPath, { recursive: true });
//   }

//   fs.writeFileSync(
//     path.join(publicPath, "sitemap-index.xml"),
//     sitemapIndexContent.trim() // Remove any unintended whitespace
//   );

//   reporter.info("Generated sitemap-index.xml with child sitemaps.");
// };
exports.onPostBuild = async ({ reporter }) => {
  const fs = require("fs");
  const sitemapPath = "./public/sitemap-page.xml";

  if (fs.existsSync(sitemapPath)) {
    let sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    sitemapContent = sitemapContent.replace(
      /<loc>(.*?)<\/loc>/g,
      (match, url) => {
        const correctedUrl = url.endsWith("/") ? url : `${url}/`;
        return `<loc>${correctedUrl}</loc>`;
      }
    );

    fs.writeFileSync(sitemapPath, sitemapContent, "utf-8");
    reporter.info("Trailing slashes enforced in sitemap.xml");
  }
  const postsitemapPath = "./public/sitemap-post.xml";

  if (fs.existsSync(sitemapPath)) {
    let sitemapContent = fs.readFileSync(postsitemapPath, "utf-8");
    sitemapContent = sitemapContent.replace(
      /<loc>(.*?)<\/loc>/g,
      (match, url) => {
        const correctedUrl = url.endsWith("/") ? url : `${url}/`;
        return `<loc>${correctedUrl}</loc>`;
      }
    );

    fs.writeFileSync(postsitemapPath, sitemapContent, "utf-8");
    reporter.info("Trailing slashes enforced in sitemap.xml");
  }
};
