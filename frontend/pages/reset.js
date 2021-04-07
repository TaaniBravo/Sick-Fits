import React from "react";
import RequestReset from "../components/RequestReset";

const reset = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must request a password change.</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <h1>reset yo shit!</h1>
    </div>
  );
};

export default reset;
