import React from "react";
import CreateProduct from "../components/CreateProduct";
import PleaseSignIn from "../components/PleaseSignIn";

function sell() {
  return (
    <PleaseSignIn>
      <CreateProduct />
    </PleaseSignIn>
  );
}

export default sell;
