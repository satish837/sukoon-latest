const ReactDOM = require("react-dom/client");
require("./src/styles/global.css");
exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  const path = location.pathname;
  if (
    path.includes("rehabilitation-services") ||
    path.includes("psychiatric-services") ||
    path.includes("mental-health-consultation")
  ) {
    return false;
  }
  return true;
};

exports.onRouteUpdate = ({ location, prevLocation }) => {
  // Redirect from old route (capital G) to new route (lowercase g)
  if (location.pathname === "/psychiatric-hospital-in-Gurgaon/" || 
      location.pathname === "/psychiatric-hospital-in-Gurgaon") {
    window.location.replace("/psychiatric-hospital-in-gurgaon/");
    return;
  }

  // Redirect from psychiatrist-bengaluru to psychiatric-hospital-in-bengaluru
  if (location.pathname === "/psychiatrist-bengaluru/" || 
      location.pathname === "/psychiatrist-bengaluru") {
    window.location.replace("/psychiatric-hospital-in-bengaluru/");
    return;
  }

  // Redirect from psychiatrist-hyderabad to psychiatric-hospital-in-hyderabad
  if (location.pathname === "/psychiatrist-hyderabad/" || 
      location.pathname === "/psychiatrist-hyderabad") {
    window.location.replace("/psychiatric-hospital-in-hyderabad/");
    return;
  }

  // Redirect from weeklyRoutine to weeklyroutine
  if (location.pathname === "/weeklyRoutine/" || 
      location.pathname === "/weeklyRoutine") {
    window.location.replace("/weeklyroutine/");
    return;
  }

  // Redirect from blog/rTMS and blog/rtms to blog/what-is-rtms-in-india
  if (location.pathname === "/blog/rTMS/" || 
      location.pathname === "/blog/rTMS" ||
      location.pathname === "/blog/rtms/" ||
      location.pathname === "/blog/rtms") {
    window.location.replace("/blog/what-is-rtms-in-india/");
    return;
  }

  // Redirect from blog/anorexia-nervosa and blog/anorexia-nervosa-blog to blog/anorexia-nervosa-symptoms-prevention-treatment
  if (location.pathname === "/blog/anorexia-nervosa/" || 
      location.pathname === "/blog/anorexia-nervosa" ||
      location.pathname === "/blog/anorexia-nervosa-blog/" ||
      location.pathname === "/blog/anorexia-nervosa-blog") {
    window.location.replace("/blog/anorexia-nervosa-symptoms-prevention-treatment/");
    return;
  }

  // Redirect from psychiatric-treatment-in-India to psychiatric-treatment-in-india
  if (location.pathname === "/mental-health-consultation/psychiatric-treatment-in-India/" || 
      location.pathname === "/mental-health-consultation/psychiatric-treatment-in-India") {
    window.location.replace("/mental-health-consultation/psychiatric-treatment-in-india/");
    return;
  }

  // Redirect from rehabilitation-services/alcohol-deaddiction/2 to rehabilitation-services/alcohol-deaddiction/
  if (location.pathname === "/rehabilitation-services/alcohol-deaddiction/2/" || 
      location.pathname === "/rehabilitation-services/alcohol-deaddiction/2") {
    window.location.replace("/rehabilitation-services/alcohol-deaddiction/");
    return;
  }

  // Redirect from blog/different-types-of-addiction-that-indians-should-know-about-1 to blog/different-types-of-addiction
  if (location.pathname === "/blog/different-types-of-addiction-that-indians-should-know-about-1/" || 
      location.pathname === "/blog/different-types-of-addiction-that-indians-should-know-about-1") {
    window.location.replace("/blog/different-types-of-addiction/");
    return;
  }

  // Redirect from blog/body-dysmorphic to blog/body-dysmorphic-disorder-in-india
  if (location.pathname === "/blog/body-dysmorphic/" || 
      location.pathname === "/blog/body-dysmorphic") {
    window.location.replace("/blog/body-dysmorphic-disorder-in-india/");
    return;
  }

  // Redirect from blog/Bulimia-Nervosa to blog/bulimia-nervosa-treatment-in-india
  if (location.pathname === "/blog/Bulimia-Nervosa/" || 
      location.pathname === "/blog/Bulimia-Nervosa") {
    window.location.replace("/blog/bulimia-nervosa-treatment-in-india/");
    return;
  }

  // Redirect from eating-disorder to blog/eating-disorder-treatment-india
  if (location.pathname === "/eating-disorder/" || 
      location.pathname === "/eating-disorder") {
    window.location.replace("/blog/eating-disorder-treatment-india/");
    return;
  }

  // Redirect from blog/Understanding-Psychosis-and-Treatment-Methods to blog/understanding-psychosis-causes-and-treatments-india
  if (location.pathname === "/blog/Understanding-Psychosis-and-Treatment-Methods/" || 
      location.pathname === "/blog/Understanding-Psychosis-and-Treatment-Methods") {
    window.location.replace("/blog/understanding-psychosis-causes-and-treatments-india/");
    return;
  }

  // Redirect from blog/Obsessive-Compulsive-Disorder-vs-Obsessive-Compulsive-Personality-Disorder to blog/ocd-vs-ocpd-disgnosis-and-treatment-in-India
  if (location.pathname === "/blog/Obsessive-Compulsive-Disorder-vs-Obsessive-Compulsive-Personality-Disorder/" || 
      location.pathname === "/blog/Obsessive-Compulsive-Disorder-vs-Obsessive-Compulsive-Personality-Disorder") {
    window.location.replace("/blog/ocd-vs-ocpd-disgnosis-and-treatment-in-India/");
    return;
  }

  // Redirect from blog/recognising-the-signs-and-symptoms-of-borderline-personality-disorder to blog/borderline-personality-disorder-symptoms-disgnosis-and-treatment-in-India
  if (location.pathname === "/blog/recognising-the-signs-and-symptoms-of-borderline-personality-disorder/" || 
      location.pathname === "/blog/recognising-the-signs-and-symptoms-of-borderline-personality-disorder") {
    window.location.replace("/blog/borderline-personality-disorder-symptoms-disgnosis-and-treatment-in-India/");
    return;
  }

  // Redirect from blog/signs-of-social-media-addiction-and-how-to-manage-it to blog/how-to-manage-social-media-addiction-in-indian-teens
  if (location.pathname === "/blog/signs-of-social-media-addiction-and-how-to-manage-it/" || 
      location.pathname === "/blog/signs-of-social-media-addiction-and-how-to-manage-it") {
    window.location.replace("/blog/how-to-manage-social-media-addiction-in-indian-teens/");
    return;
  }

  // Redirect from blogs/signs-of-social-media-addiction-and-how-to-manage-it to blog/how-to-manage-social-media-addiction-in-indian-teens
  if (location.pathname === "/blogs/signs-of-social-media-addiction-and-how-to-manage-it/" || 
      location.pathname === "/blogs/signs-of-social-media-addiction-and-how-to-manage-it") {
    window.location.replace("/blog/how-to-manage-social-media-addiction-in-indian-teens/");
    return;
  }

  // Redirect from blog/cbt to blog/cbt-treatment-for-mental-health-in-India
  if (location.pathname === "/blog/cbt/" || 
      location.pathname === "/blog/cbt") {
    window.location.replace("/blog/cbt-treatment-for-mental-health-in-India/");
    return;
  }

  // Redirect from blog/inpatient-vs-outpatient-care-in-India-with-Sukoon to blog/inpatient-vs-outpatient-care-in-india-with-sukoon
  if (location.pathname === "/blog/inpatient-vs-outpatient-care-in-India-with-Sukoon/" || 
      location.pathname === "/blog/inpatient-vs-outpatient-care-in-India-with-Sukoon") {
    window.location.replace("/blog/inpatient-vs-outpatient-care-in-india-with-sukoon/");
    return;
  }

  const canonicalLink = document.querySelector("link[rel='canonical']");
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  if (canonicalLink) {
    canonicalLink.setAttribute("href", canonicalUrl);
  } else {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", canonicalUrl);
    document.head.appendChild(link);
  }
  
  // Clear any stored history state when navigating to home page
  if (location.pathname === '/' && prevLocation && prevLocation.pathname.includes('/disorder/')) {
    // This ensures we don't have any lingering history state
    window.history.replaceState(null, null, location.pathname);
  }
  // const sendPageView = () => {
  //   const pagePath = location
  //     ? location.pathname + location.search + location.hash
  //     : undefined;
  // };
  // const delayOnRouteUpdate = 0;
  // setTimeout(sendPageView, 32 + delayOnRouteUpdate);
};

exports.replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container);
    root.render(element);
  };
};
exports.onInitialClientRender = () => {
  const gtmScript = document.createElement("script");
  gtmScript.type = "text/javascript";
  gtmScript.async = true;
  gtmScript.defer = true;
  gtmScript.src =
    "https://www.googletagmanager.com/gtag/js?id=GTM-WTXZLJ8&l=dataLayer&cx=c";
  document.head.appendChild(gtmScript);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
  // Clarity script
  const clarityScript = document.createElement("script");
  clarityScript.type = "text/javascript";
  clarityScript.async = true;
  clarityScript.defer = true;
  clarityScript.src = "https://www.clarity.ms/tag/oybg5bhw81";
  document.head.appendChild(clarityScript);

  // Initialize Clarity
  window.clarity =
    window.clarity ||
    function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
};
