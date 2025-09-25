import React from "react";
import Link from "next/link";

import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/404.css" />
      </Head>

      <div className="notfound-container">
        <div className="notfound-content">
          <h1 className="glitch" data-text="404">404</h1>
          <h2 className="fadeIn">Oops! Page not found</h2>
          <p className="fadeIn delay-1s">
            The page you are looking for might be removed or is temporarily unavailable.
          </p>
          <a href="/" className="btn-home fadeIn delay-2s">Go Back Home</a>
        </div>
      </div>
    </>
  );
}

