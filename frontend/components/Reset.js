import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token
  });

  const [reset, { data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs
  });

  const successError = data?.redeemUserPasswordResetToken
    ? data?.redeemUserPasswordResetToken
    : undefined;

  const handleSubmit = async e => {
    e.preventDefault();

    await reset().catch(console.error);

    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <DisplayError error={error || successError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Password was reset.</p>
        )}
        <label htmlFor="email" id="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" id="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Password</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
