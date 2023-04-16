import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [PhoneNO, setPhoneNO] = useState("");

  const registeruser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/signupserver", {
      method: "POST",
      changeOrigin: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        PhoneNO: PhoneNO,
        Password: password,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid");
    } else if (res.status === 422 || !data) {
      window.alert("Invalid");
    } else {
      // Send registration confirmation email with login credentials
      const sendEmailRes = await fetch("http://localhost:8000/sendemail", {
        method: "POST",
        changeOrigin: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ToEmail: email,
          password: password,
        }),
      });

      if (sendEmailRes.status === 200) {
        window.alert(
          "Registration successful. Please check your email for login credentials."
        );
        history("/Login");
      } else {
        window.alert(
          "Registration successful, but failed to send confirmation email."
        );
      }
    }
  };
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
          placeholder="Mobile No"
          value={PhoneNO}
          onChange={(e) => setPhoneNO(e.target.value)}
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
        <button onClick={registeruser}> Create Account</button>
      </form>
    </div>
  );
}
