import { graphql } from 'gatsby';
import React from 'react';
import PizzaList, { PizzaListFragment } from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function ToppingPage({ data, pageContext: { toppingName } }) {
  return (
    <>
      <ToppingsFilter active={toppingName} />
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  );
}

// Only select pizzas which have a specific topping
export const query = graphql`
  query pizzasWithTopping($toppingName: String!) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $toppingName } } } }
    ) {
      nodes {
        ...PizzaListFragment
      }
    }
  }
`;
