import calcPizzaPrice from './calcPizzaPrice';

export default function calcOrderTotal(order, pizzas) {
  return order.reduce((accum, orderItem) => {
    // lookup the pizza for this order item
    const pizza = pizzas.find((p) => p.id === orderItem.pizzaId);
    return accum + calcPizzaPrice(pizza.price, orderItem.size);
  }, 0);
}
