import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(3)
    .matches(/foo/, "Password must contain 'foo'")
    .required()
});

export default function useLoginForm() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null
  });

  const formIsValid =
    fields.email !== "" &&
    fields.password !== "" &&
    !errors.email &&
    !errors.password;

  function handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    if (target.type !== "checkbox") {
      validateField(name, value);
    }

    setFields({ ...fields, [name]: value });
  }

  function handleBlur(event) {
    const { target } = event;
    const { name, value } = target;
    validateField(name, value);
  }

  function validateField(name, value) {
    // console.log("validateField():", name, value);
    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
        setErrors({ ...errors, [name]: null });
      })
      .catch(e => {
        setErrors({ ...errors, [name]: e.errors });
      });
  }

  return {
    fields,
    errors,
    formIsValid,
    handleInputChange,
    handleBlur
  };
}
