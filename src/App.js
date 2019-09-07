import React from "react";
import "./App.css";
import useLoginForm from "./useLoginForm";

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
  const {
    fields,
    errors,
    formIsValid,
    handleInputChange,
    handleBlur
  } = useLoginForm();

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
    </div>
  );
}

export default App;
