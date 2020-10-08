import { graphql } from 'gatsby';
import React from 'react';
import PizzaList, { PizzaListFragment } from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  return (
    <>
      <SEO title="All Pizzas" />
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
