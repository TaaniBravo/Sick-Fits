import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';
import DisplayError from './ErrorMessage';
import Link from 'next/link';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
`;

const SignInNeeded = styled.p`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const StyledSpan = styled.span`
  color: red;
  &:hover {
    color: darkred;
    cursor: pointer;
  }

  &:focus {
    color: darkred;
  }
`;

const Products = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <SignInNeeded>
        Please{' '}
        <Link
          href={{
            pathname: '/signin'
          }}
        >
          <StyledSpan>Sign-In/Sign-Up</StyledSpan>
        </Link>{' '}
        to View Products
      </SignInNeeded>
    );

  return (
    <div>
      <ProductsList>
        {data.allProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsList>
    </div>
  );
};

export default Products;
