import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import DisplayError from "../components/ErrorMessage";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";
import formatMoney from "../lib/formatMoney";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 4rem;
`;

const countItemsInOrder = order =>
  order.items.reduce((acc, item) => acc + item.quantity, 0);

const Orders = () => {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Sick Fits - Your Orders</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map(order => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInOrder(order)} Items</p>
                  <p>
                    {order.items.length} Product{order.items.length > 1 && "s"}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map(item => (
                    <img
                      key={`img-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

export default Orders;
