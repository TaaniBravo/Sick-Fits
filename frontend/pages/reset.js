import React from "react";
import Reset from "../components/Reset";

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
      <Reset token={query.token} />
    </div>
  );
};

export default reset;
