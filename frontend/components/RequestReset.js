import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: ""
  });

  const [signup, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs
  });

  const handleSubmit = async e => {
    e.preventDefault();

    await signup().catch(console.error);

    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
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
        <button type="submit">Send Request</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
