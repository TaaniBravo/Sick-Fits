import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import SickButton from "./styles/SickButton";
import nProgress from "nprogress";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // Start the page transition.
    nProgress.start();
    // Create the payment method via stripe (Token comes back here if successful).
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    console.log(paymentMethod);
    // Handle any errors from stripe.
    if (error) setError(error);
    // Handle any erros from stripe.

    // Send the token from step 3 to our keystone serve, via a custom mutation!

    // Change the page to view the order.

    // Close the cart.

    // Turn the loader off.
    setLoading(false);
    nProgress.done();
  };

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      <CardElement />
      <SickButton>Checkout</SickButton>
    </CheckoutFormStyles>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;