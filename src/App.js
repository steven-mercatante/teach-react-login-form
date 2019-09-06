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
    .matches(/foo/)
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
  const [isValid, setIsValid] = useState(false);

  const [fields, setFields] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null
  });

  function handleInputChange(event) {
    const { target } = event;
    const { name } = target;

    const value = target.type === "checkbox" ? target.checked : target.value;

    if (target.type !== "checkbox") {
      if (errors[name]) {
        validateField2(name, value);
      }
    }

    setFields({ ...fields, [name]: value });
  }

  function validate() {
    const emailIsValid = false;
    const passwordIsValid = false;
    const isValid = emailIsValid && passwordIsValid;

    // schema.isValid({ fields.email.value }).then(valid => {
    //   console.log(`TCL: validate -> valid`, valid);
    // });

    setIsValid(isValid);
    return isValid;
  }

  function validateField(event) {
    const { target } = event;
    const { name, value } = target;
    console.log("validateField", name, value);

    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
        console.log(`${name} is valid`);
        setErrors({ ...errors, [name]: null });
        // setFields({ ...fields, [name]: { ...fields[name], isValid: true } });
      })
      .catch(e => {
        console.log(e);
        setErrors({ ...errors, [name]: e.errors });
        // setFields({ ...fields, [name]: { ...fields[name], isValid: false } });
      });
  }

  function validateField2(name, value) {
    console.log("validateField2():", name, value);

    yup
      .reach(schema, name)
      .validate(value)
      .then(valid => {
        setErrors({ ...errors, [name]: null });
      })
      .catch(e => {
        console.error(e);
        setErrors({ ...errors, [name]: e.errors });
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    validate();
    // if (validate()) {
    //   console.table({ email, password, remember });
    // } else {
    //   alert("Form is not valid");
    //   return;
    // }
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
          onBlur={validateField}
        />
        <Errors errors={errors["email"]} />

        <label htmlFor="password">Password</label>
        <input
          className={errors["password"] ? "invalid" : ""}
          type="password"
          name="password"
          value={fields.password}
          onChange={handleInputChange}
          onBlur={validateField}
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

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(fields.email.isValid && fields.password.isValid)}
        >
          {/* <button type="submit" onClick={handleSubmit}> */}
          Submit
        </button>
      </form>

      <div>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
      </div>

      <div>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
