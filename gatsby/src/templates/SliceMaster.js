import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

export default function SliceMasterPage({ data: { sliceMaster } }) {
  return (
    <div>
      <Img fluid={sliceMaster.image.asset.fluid} alt={sliceMaster.name} />
      <h2 className="center">
        {' '}
        <span className="mark"> SliceMaster {sliceMaster.name}</span>
      </h2>
      <p className="center">{sliceMaster.description}</p>
    </div>
  );
}

// $personId is passed from creatPage() context
export const query = graphql`
  query PersonQuery($personId: String!) {
    sliceMaster: sanityPerson(id: { eq: $personId }) {
      name
      id
      description
      slug {
        current
      }
      image {
        asset {
          fluid(maxWidth: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
