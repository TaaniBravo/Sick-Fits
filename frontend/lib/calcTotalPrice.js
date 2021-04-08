const calcTotalPrice = cart => {
  return cart.reduce((acc, item) => {
    if (!item.product) return acc; // products can be deleted but they could still be in your cart

    return acc + item.quantity * item.product.price;
  }, 0);
};

export default calcTotalPrice;
