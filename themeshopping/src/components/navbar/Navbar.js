import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../context/GlobalState";

const Navbar = () => {
  const { cart } = useContext(GlobalContext);
  return (
    <>
      <div className="navbar">
        <Link to="/itemsection">
          <h2>shopinn</h2>
        </Link>
        <ul className="navbar-ul">
          {/* <li>Womens</li>
          <li>Mens</li>
          <li>Clothing</li> */}
          <Link to="/Show">
            <li>Show</li>
          </Link>
          <Link to="/cart">
            <li>
              &#128722;{" "}
              <span className="card-count" style={{ color: "red" }}>
                ({cart.length})
              </span>
            </li>
          </Link>
          <Link to="/orders">
            <li>Orders</li>
          </Link>
          <Link to="/Contact">
            <li>Contact</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>{" "}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
