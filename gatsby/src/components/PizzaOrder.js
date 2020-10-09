import React from 'react';
import Img from 'gatsby-image';
import { MenuItemStyles } from './MenuItemStyles';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import formatMoney from '../utils/formatMoney';

// I kinda hate how this component needs to have so many props!
// but this is necessary since order is normalized to only store
// a pizza index and all other pizza logic is in the order.js file
export default function PizzaOrder({ order, pizzas, removeIdxFromOrder }) {
  return order.map((orderItem, idx) => {
    // Lookup the pizza for this orderItem
    const pizza = pizzas.find((p) => p.id === orderItem.pizzaId);
    return (
      <MenuItemStyles key={`${pizza.id}-${idx}`}>
        <Img
          width="50"
          height="50"
          fluid={pizza.image.asset.fluid}
          alt={pizza.name}
        />
        <div className="name">
          <h2>
            {pizza.name} <span>({orderItem.size})</span>
          </h2>
          <button
            type="button"
            className="remove"
            title={`Remove ${orderItem.size} ${pizza.name}`}
            onClick={() => removeIdxFromOrder(idx)}
          >
            &times;
          </button>
        </div>
        <p>{formatMoney(calcPizzaPrice(pizza.price, orderItem.size))}</p>
      </MenuItemStyles>
    );
  });
}
