import React from "react";

const CreateProduct = () => {
  return (
    <form>
      <label htmlFor="name">
        Name:
        <input type="text" id="name" name="name" />
      </label>
    </form>
  );
};

export default CreateProduct;
