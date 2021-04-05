import { useRouter } from "next/dist/client/router";
import React from "react";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

const products = () => {
  const { query } = useRouter();

  return (
    <div>
      <Pagination page={query.page || 1} />
      <Products />
      <Pagination page={query.page || 1} />
    </div>
  );
};

export default products;
