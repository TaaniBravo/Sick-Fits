import { useState } from "react";

const useForm = (initial = {}) => {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs({
      // copy existing state.
      ...inputs,
      [name]: [value]
    });
  };

  // return the things we want from this custom hook.
  return {
    inputs,
    handleChange
  };
};

export default useForm;
