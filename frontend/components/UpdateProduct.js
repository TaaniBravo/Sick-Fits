import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { SINGLE_ITEM_QUERY } from "./SingleProduct";
import Form from "./styles/Form";

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  // use our queries and mutations
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id
    }
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading }
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  //   Call on our useForm states.
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  const handleSubmit = async e => {
    e.preventDefault();

    const res = await updateProduct({
      variables: {
        id,
        name: inputs.name,
        description: inputs.description,
        price: inputs.price
      }
    });
    // clearForm();
    // // Go to that product's page!
    // Router.push({
    //   pathname: `/product/${res.data.updateProduct.id}`
    // });
  };

  if (loading) return <p>Loading</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="..."
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
