import { useState } from 'react';

// defaults is an obj containing keys/values for the name of each form input element
export default function useForm(defaults) {
  // State is an object with keys for the name of each element
  const [values, setValues] = useState(defaults);

  const updateHandler = (evt) => {
    // form element values will always be a string, so convert to a nnumber if the input type should be number
    const value =
      evt.target.type === 'number'
        ? parseFloat(evt.target.value)
        : evt.target.value;

    setValues({
      ...values,
      [evt.target.name]: value,
    });
  };

  return [values, updateHandler];
}
