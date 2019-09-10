import React, { useState } from "react";
import "./App.css";
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

function Errors({ errors }) {
  if (!errors) return null;

  return (
    <ul className="errors">
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  );
}

function App() {
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

  function handleSubmit(event) {
    event.preventDefault();
    if (formIsValid) {
      console.table(fields);
    } else {
      alert("Form is not valid");
      return;
    }
  }

  return (
    <div className="App">
      <form>
        <label htmlFor="email">Email</label>
        <input
          className={errors["email"] ? "invalid" : ""}
          type="email"
          name="email"
          value={fields.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <Errors errors={errors["email"]} />

        <label htmlFor="password">Password</label>
        <input
          className={errors["password"] ? "invalid" : ""}
          type="password"
          name="password"
          value={fields.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        <Errors errors={errors["password"]} />

        <label>
          <input
            type="checkbox"
            name="remember"
            checked={fields.remember}
            onChange={handleInputChange}
          />
          <span>Remember me</span>
        </label>

        <button type="submit" onClick={handleSubmit} disabled={!formIsValid}>
          Submit
        </button>
      </form>

      {/* <div>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
      </div>

      <div>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default App;
