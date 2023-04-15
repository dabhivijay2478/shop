import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../navbar/Navbar";

function HomePage() {
  const nav = useNavigate();

  useEffect(() => {
    const isLoggedIn = Cookies.get("User");
    if (!isLoggedIn) {
      return nav("/");
    }
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
    </>
  );
}

export default HomePage;
