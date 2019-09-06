import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.table({ email, password, remember });
  }

  return (
    <div className="App">
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            name="remember"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
          />
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
