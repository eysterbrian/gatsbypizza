import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const BeerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  .singleBeer {
    border: 1px solid var(--grey);
    padding: 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .numReviews {
      font-size: 0.7em;
    }
    img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      display: grid;
      align-items: center;
      font-size: 0.7em;
      margin-bottom: 1rem;
    }
  }
`;

function SingleBeer({ beer }) {
  return (
    <div className="singleBeer">
      <div>
        {beer.image && <img src={beer.image} alt={beer.name} />}
        <h3 className="name">{beer.name}</h3>
        <p className="price">{beer.price}</p>
      </div>
      {beer.rating && (
        <p
          className="rating"
          title={`${Math.round(beer.rating.average)} out of 5 stars - with ${
            beer.rating.reviews
          } reviews`}
        >
          {'⭐'.repeat(Math.round(beer.rating.average))}
          <span style={{ filter: 'grayscale(100%)' }}>
            {'⭐'.repeat(5 - Math.round(beer.rating.average))}
          </span>{' '}
          <span className="numReviews">({beer.rating.reviews})</span>
        </p>
      )}
    </div>
  );
}

export default function BeersPage({ data: { beers } }) {
  return (
    <>
      <h2 className="center">
        We have {beers.nodes.length} beers. Dine-in only!
      </h2>
      <BeerStyles>
        {beers.nodes.map((beer) => (
          <SingleBeer key={beer.id} beer={beer} />
        ))}
      </BeerStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        name
        id
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
