import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const PizzaStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <PizzaStyles>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        {/* <p>Price: {pizza.price}</p> */}
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </PizzaStyles>
  );
}

// The variable $slug is passed in the `context` parameter in gatsby-node's createPage() fn
export const query = graphql`
  query singlePizzaQuery($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      price
      id
      toppings {
        name
        id
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
