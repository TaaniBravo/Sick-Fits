import React from "react";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import { useUser } from "./User";
import CartItem from "./CartItem";
import formatMoney from "../lib/formatMoney";
import calcTotalPrice from "../lib/calcTotalPrice";

const Cart = () => {
  const user = useUser();

  if (!user) return null;

  return (
    <CartStyles open>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
      </header>
      <ul>
        {user.cart.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
