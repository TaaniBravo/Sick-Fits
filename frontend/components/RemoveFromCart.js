import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import styled from "styled-components";

const RemoveButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCart = ({ id }) => {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id
    },
    update
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: "CartItem",
    //     id
    //   }
    // }
  });

  return (
    <button
      onClick={removeFromCart}
      type="button"
      title="Remove This Item from Cart"
    >
      &times;
    </button>
  );
};

export default RemoveFromCart;
