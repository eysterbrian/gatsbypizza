import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <span className="mark">{pizza.name}</span>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      </Link>
    </div>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <ul>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}
