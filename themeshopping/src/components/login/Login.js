import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginuser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/loginserver", {
      method: "POST",
      changeOrigin: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });
    const data = await response.json();
    console.log(`User role: ${data.Role}`);

    const role = await data.Role;
    console.log(role);
    if (response.status === 400 || !data) {
      window.alert("Invaild");
    } else {
      Cookies.set(role, true, { expires: 1 });
      window.alert("Sucess");
      if (role === "Admin") {
        history("/admin");
        Cookies.set("Adminemail", email);
      } else if (role === "seller") {
        history("/seller");
        Cookies.set("Selleremail", email);
      } else if (role === "User") {
        history("/itemsection");
        Cookies.set("Useremail", email);
      } else {
        history("*");
      }
    }
  };

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
          <button onClick={loginuser}>Submit</button>
        </form>
      </div>
    </>
  );
}
