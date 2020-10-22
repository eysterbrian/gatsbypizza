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

  const {
    order,
    addToOrder,
    removeIdxFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useOrder({
    pizzas,
    customer: values,
  });

  // If order is successful then just show the message without the form
  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order a Pizza" />
      <OrderFormStyles onSubmit={submitOrder}>
        <fieldset className="customer" disabled={loading}>
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
        <fieldset disabled={loading}>
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
        <fieldset disabled={loading}>
          <legend>Order</legend>
          <div className="order">
            <PizzaOrder
              order={order}
              pizzas={pizzas}
              removeIdxFromOrder={removeIdxFromOrder}
            />
          </div>
        </fieldset>
        <fieldset className="total" disabled={loading}>
          <h2>
            Your order total is {formatMoney(calcOrderTotal(order, pizzas))}
          </h2>
          <div>{error && <p>{error}</p>}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Order Ahead'}
          </button>
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
