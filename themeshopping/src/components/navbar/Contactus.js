import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Contactus() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendmessage = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/Contactus", {
      method: "POST",
      changeOrigin: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,

        Email: email,

        Message: message,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invaild");
    } else if (res.status === 422 || !data) {
      window.alert("Bad");
    } else {
      window.alert("SucessFully Send Message");
      history("/User");
    }
  };
  return (
    <>
      <div class="container my-24 px-6 mx-auto">
        <section class="mb-32 text-center text-gray-800">
          <div class="max-w-[700px] mx-auto px-3 lg:px-6">
            <h2 class="text-3xl font-bold mb-12">Contact us</h2>
            <form>
              <div class="form-group mb-6">
                <input
                  type="text"
                  class="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form-group mb-6">
                <input
                  type="email"
                  class="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput8"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="form-group mb-6">
                <textarea
                  class="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          "
                  id="exampleFormControlTextarea13"
                  rows="3"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                onClick={sendmessage}
                class="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
