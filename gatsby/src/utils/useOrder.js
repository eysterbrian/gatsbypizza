import { useContext, useState } from 'react';

import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calcOrderTotal from './calcOrderTotal';
import formatMoney from './formatMoney';

export default function useOrder({ pizzas, customer }) {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  function removeIdxFromOrder(orderIdx) {
    setOrder(order.filter((_, idx) => idx !== orderIdx));
  }

  // Run with user submits the form
  async function submitOrder(evt) {
    evt.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calcOrderTotal(order, pizzas)),
      name: customer.name,
      email: customer.email,
    };
    console.log({ body });

    // Send this data to the serverless fn when they checkout
    try {
      const res = await fetch(
        `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const text = await JSON.parse(res.text());

      if (res.status >= 400 && res.status < 600) {
        setError(text.message);
      } else {
        setMessage('Come on down to pickup your delicious pizza!');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    order,
    addToOrder,
    removeIdxFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
