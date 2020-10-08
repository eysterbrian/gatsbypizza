import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function SEO({
  children,
  title,
  location,
  description,
  image = '',
}) {
  // Get the name of the website
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          titleTemplate
          description
        }
      }
    }
  `);

  const descriptionTxt = description || siteMetadata.description;

  return (
    <Helmet titleTemplate={siteMetadata.titleTemplate}>
      <html lang="en" />
      <title>{title}</title>
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      {/* Potentially unnecessary tags (Gatsby probably provides these already) */}
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta charset="utf-8" />
      {/* SEO Meta tags */}
      <meta name="description" content={descriptionTxt} />
      {/* Open Graph tags */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={siteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={descriptionTxt} key="ogdesc" />
      {/* Allow child components here to overwrite any Helmet tags */}
      {children}
    </Helmet>
  );
}
