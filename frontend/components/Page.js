import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";

const Page = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <h1>lol</h1>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.any
};

export default Page;
