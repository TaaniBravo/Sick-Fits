import { KeystoneContext } from "@keystone-next/types";
import {
  CartItemCreateInput,
  OrderCreateInput
} from "../.keystone/schema-types";
import stripeConfig from "../lib/stripe";

interface Arguments {
  token: string;
}

const graphql = String.raw;

const checkout = async (
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> => {
  // Make sure that they are signed in
  const userId = context.session.itemId;
  if (!userId)
    throw new Error("Sorry! You must be signed in to create an order!");

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
            id
            name
            price
            description
            photo {
                id
                image {
                    id
                    publicUrlTransformed
                }
            }
        }
      }
      `
  });

  // Calc the total price for their order
  const cartItems = user.cart.filter(cartItem => cartItem.product);

  const amount = cartItems.reduce(
    (acc: number, cartItem: CartItemCreateInput) =>
      acc + cartItem.quantity * cartItem.product.price,
    0
  );

  // create the payment with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "USD",
      confirm: true,
      payment_method: token
    })
    .catch(err => {
      console.log(err);
      throw new Error(err.message);
    });
    console.log(charge);
    
  // Convert the cartitems to Order items

  // Create the order and return it
};

export default checkout;
