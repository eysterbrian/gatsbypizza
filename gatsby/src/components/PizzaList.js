import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const PizzaListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
`;

const PizzaStyles = styled.div`
  display: grid;

  /* In case subgrid isn't supported by browser, provide fallback style */
  @supports not (grid-template-rows: subgrid) {
    --subgridrows: auto auto 1fr;
  }

  /* Use subgrid to provide row sizing from the parent's grid */
  grid-template-rows: var(--subgridrows, subgrid);
  grid-row: span 3;
  gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <span className="mark">{pizza.name}</span>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </PizzaStyles>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <PizzaListStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaListStyles>
  );
}
