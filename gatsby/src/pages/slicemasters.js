import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const SliceMasterGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    z-index: 2;
    position: relative;
  }
  p {
    transform: rotate(1deg);
    padding: 1rem;
    margin: 2rem;
    margin-top: -8rem;
    width: 70%;
    background: var(--yellow);
    z-index: 2;
    position: relative;
    text-align: center;
  }
`;

export default function SliceMastersPage({ data }) {
  console.log(data.slicemasters);
  return (
    <SliceMasterGridStyles>
      {data.slicemasters.nodes.map((slicemaster) => (
        <SliceMasterStyles>
          <Link to={`/slicemaster/${slicemaster.slug.current}`}>
            <h2>
              <span className="mark">{slicemaster.name}</span>
            </h2>
            <Img fluid={slicemaster.image.asset.fluid} />
            <p className="description">{slicemaster.description}</p>
          </Link>
        </SliceMasterStyles>
      ))}
    </SliceMasterGridStyles>
  );
}

export const query = graphql`
  query MyQuery {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        name
        description
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
      }
    }
  }
`;
