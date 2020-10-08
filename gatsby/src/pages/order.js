import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import SEO from '../components/SEO';
import calcPizzaPrice from '../utils/calcPizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';

export default function OrderPage({ data }) {
  const [values, updateHandler] = useForm({
    email: '',
    name: '',
  });

  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title="Order a Pizza" />
      <form>
        <fieldset>
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
          {pizzas.map((pizza) => (
            <div key={pizza.id}>
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
                  {['S', 'M', 'L'].map(size => (
                    <button key={size}>{size} { formatMoney(calcPizzaPrice(pizza.price, size)) }</button>
                  ))}
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Order</legend>
        </fieldset>
      </form>
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
