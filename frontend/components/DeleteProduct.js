import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id }
    }
  );

  return (
    <button
      type="button"
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          console.log("delete");
          deleteProduct().catch(err => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteProduct;