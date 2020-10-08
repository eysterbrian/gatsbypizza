import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export default function SEO({ title }) {
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

  return (
    <Helmet titleTemplate={siteMetadata.titleTemplate}>
      <html lang="en" />
      <title>{title}</title>
    </Helmet>
  );
}
