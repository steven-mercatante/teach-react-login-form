import React from "react";
import "./App.css";

function App() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="App">
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <label>
          <input type="checkbox" name="remember" />
          <span>Remember me</span>
        </label>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
