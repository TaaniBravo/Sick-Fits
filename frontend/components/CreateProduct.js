import React from "react";
import useForm from "../lib/useForm";

const CreateProduct = () => {
  const { inputs, handleChange } = useForm({
    name: "",
    price: 0,
    desc: ""
  });

  return (
    <form>
      <label htmlFor="name">
        Name:{" "}
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default CreateProduct;
