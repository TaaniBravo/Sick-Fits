import { useEffect, useState } from "react";

const useForm = (initial = {}) => {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = e => {
    let { name, value, type } = e.target;
    if (type === "number") value = parseInt(value);
    if (type === "file") [value] = e.target.files;

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
