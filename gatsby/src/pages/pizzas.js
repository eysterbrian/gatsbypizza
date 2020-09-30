import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  return (
    <>
      <h1>Pizzas</h1>
      <ToppingsFilter />
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        slug {
          current
        }
        id
        price
        toppings {
          name
          id
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
  }
`;
