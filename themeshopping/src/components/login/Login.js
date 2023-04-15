import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);


  return (
    <>
      <div className="login">
        <form class="form">
          Login
          <input
            type="text"
            class="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            class="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/register">
            <h4 className="h44">not having an account?</h4>
          </Link>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
