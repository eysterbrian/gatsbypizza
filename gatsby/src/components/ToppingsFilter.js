import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

// Return an array with all the toppings (name, id, pizza count)
// sorted by the number of pizzas that include this topping
function getToppingsWithPizzaCounts(toppings, pizzas) {
  // Initialize with all the toppings
  const toppingsWithCounts = toppings.reduce((acc, topping) => {
    acc[topping.id] = {
      count: 0,
      id: topping.id,
      name: topping.name,
    };
    return acc;
  }, {});

  // Count how many pizzas have each topping
  const pizzasPerToppingObj = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      acc[topping.id].count += 1;
      return acc;
    }, toppingsWithCounts);

  // Sort the toppings by the count of pizzas with that topping
  const sortedToppings = Object.values(pizzasPerToppingObj).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

export default function ToppingsFilter() {
  // Get a list of all the toppings, and all pizzas (along with each topping)
  const { toppings, pizzas } = useStaticQuery(graphql`
    query ToppingsQuery {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const sortedToppings = getToppingsWithPizzaCounts(
    toppings.nodes,
    pizzas.nodes
  );

  return (
    <ToppingsStyles>
      {sortedToppings.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
