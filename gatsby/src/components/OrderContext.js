import React, { useState } from 'react';

// Create a new context
const OrderContext = React.createContext();

// We can't just use OrderContext.Provider here because we need to add some state via a hook
export function OrderProvider({ children }) {
  // Rather than store this state in useOrder, we promote it to this context provider
  const [order, setOrder] = useState([]);

  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

// Since our file is OrderContext.js, we make the OrderContext the default export.
// This is the convention to have the context be the filename.
export default OrderContext;
