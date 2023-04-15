import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function Register() {
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [cpassword, setCpassword] = useState([]);

  return (
    <div className="register">
      <form className="form">
        Register
        <input
          type="text"
          class="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="text"
          class="input"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
        <Link to="/login">
          <h4 className="h44">already have an account?</h4>
        </Link>
        <button>Create Account</button>
      </form>
    </div>
  );
}
