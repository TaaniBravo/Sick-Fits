import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();

const { Provider } = LocalStateContext;

const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(true);

  const toggleCart = () => setCartOpen(!cartOpen);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  return (
    <Provider
      value={{ cartOpen, setCartOpen, toggleCart, openCart, closeCart }}
    >
      {children}
    </Provider>
  );
};

// custom hook for accessing the cart local state
const useCart = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { CartStateProvider, useCart };
