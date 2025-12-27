// eslint-disable-next-line no-unused-vars
import React from "react";

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Lato/Bold.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="latoFontBold"
    />,
    <link
      rel="preload"
      href="/fonts/Lato/Regular.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="latoFontRegular"
    />,
    <link
      // rel="preload"
      href="/fonts/Acanthis/Bold.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="acanthisFontBold"
    />,
    <link
      // rel="preload"
      href="/fonts/Acanthis/Regular.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="acanthisFontRegular"
    />,
    <link
      // rel="preload"
      href="/fonts/Acanthis/Italic.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="acanthisFontItalic"
    />,
  ]);
  setPreBodyComponents([
    <noscript
      key="gtm-iframe"
      dangerouslySetInnerHTML={{
        __html: `
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WTXZLJ8" 
            height="0" 
            width="0" 
            style="display: none; visibility: hidden" 
            aria-hidden="true" 
            loading="lazy"
          ></iframe>
        `,
      }}
    />,
  ]);
};

