import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

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

export default function SliceMastersPage({ data, pageContext }) {
  return (
    <>
      <SEO title={`Slicemasters - page ${pageContext.currentPage || 1}`} />
      <Pagination
        baseUrl="/slicemasters"
        currentPage={pageContext.currentPage || 1}
        totalCount={data.slicemasters.totalCount}
        pageSize={parseInt(process.env.GATSBY_ITEMS_PER_PAGE)}
      />
      <SliceMasterGridStyles>
        {data.slicemasters.nodes.map((slicemaster) => (
          <SliceMasterStyles key={slicemaster.id}>
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
    </>
  );
}

// Receives $skip, $pageNum and $pageSize from Actions.createPage(
// Note that the default value for $pageSize is set to a fixed value insted of the value set in process.env
export const query = graphql`
  query SlicemastersQuery($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(skip: $skip, limit: $pageSize) {
      totalCount
      nodes {
        name
        description
        id
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
