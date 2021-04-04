import { useState } from "react";

const useForm = (initial = {}) => {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  const handleChange = e => {
    let { name, value, type } = e.target;
    if (type === "number") value = parseInt(value);
    if (type === "file") value[0] = e.target.files;

    console.log(value);

    setInputs({
      // copy existing state.
      ...inputs,
      [name]: value
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ""])
    );

    setInputs(blankState);
  };

  // return the things we want from this custom hook.
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm
  };
};

export default useForm;
