import { useState } from 'react';

export default function useOrder({ pizzas, inputs }) {
  const [order, setOrder] = useState([]);

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  function removeIdxFromOrder(orderIdx) {
    setOrder(order.filter((_, idx) => idx !== orderIdx));
  }

  return {
    order,
    addToOrder,
    removeIdxFromOrder,
  };
}
