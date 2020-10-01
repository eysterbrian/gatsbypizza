import { graphql } from 'gatsby';
import React from 'react';
import PizzaList, { PizzaListFragment } from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        ...PizzaListFragment
      }
    }
  }
`;
