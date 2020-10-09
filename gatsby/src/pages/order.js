import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import PizzaOrder from '../components/PizzaOrder';
import SEO from '../components/SEO';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import useOrder from '../utils/useOrder';
import { MenuItemStyles } from '../components/MenuItemStyles';
import calcOrderTotal from '../utils/calcOrderTotal';

const OrderFormStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    display: grid;
    &.customer,
    &.total {
      grid-column: span 2;
    }
    .order,
    .menu {
      max-height: 600px;
      overflow: auto;
    }
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;

  const [values, updateHandler] = useForm({
    email: '',
    name: '',
  });

  const { order, addToOrder, removeIdxFromOrder } = useOrder({
    pizzas,
    inputs: {},
  });

  return (
    <>
      <SEO title="Order a Pizza" />
      <OrderFormStyles>
        <fieldset className="customer">
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateHandler}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={updateHandler}
          />
        </fieldset>
        <fieldset>
          <legend>Menu</legend>
          <div className="menu">
            {pizzas.map((pizza) => (
              <MenuItemStyles key={pizza.id}>
                <Img
                  width="50"
                  height="50"
                  fluid={pizza.image.asset.fluid}
                  alt={pizza.name}
                />
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {['S', 'M', 'L'].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={(evt) => {
                        evt.preventDefault();
                        addToOrder({ pizzaId: pizza.id, size });
                      }}
                    >
                      {size} {formatMoney(calcPizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </MenuItemStyles>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Order</legend>
          <div className="order">
            <PizzaOrder
              order={order}
              pizzas={pizzas}
              removeIdxFromOrder={removeIdxFromOrder}
            />
          </div>
        </fieldset>
        <fieldset className="total">
          <h2>
            Your order total is {formatMoney(calcOrderTotal(order, pizzas))}
          </h2>
          <button type="submit">Order Ahead</button>
        </fieldset>
      </OrderFormStyles>
    </>
  );
}

export const query = graphql`
  query AllPizzasQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        image {
          asset {
            fluid(maxWidth: 200) {
              ...GatsbySanityImageFluid
            }
          }
        }
        slug {
          current
        }
      }
    }
  }
`;
