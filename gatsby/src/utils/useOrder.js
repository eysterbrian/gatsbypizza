import { useContext } from 'react';

import OrderContext from '../components/OrderContext';

export default function useOrder({ pizzas, inputs }) {
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);

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
