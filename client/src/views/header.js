import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { updateCartTotalQuantity } from "../redux/slice/cart";
const Header = () => {
  const tableValue = localStorage.getItem("table");
  const { lengthCart } = useSelector((state) => {
    return {
      lengthCart: state.cart.count,
    };
  });
  const dispatch = useDispatch();
  const getCart = async () => {
    try {
      const tableValue = localStorage.getItem("table");
      const response = await axios.get("http://localhost:5001/api/carts/" + tableValue);
      dispatch(updateCartTotalQuantity(response.data.data.length));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center">
            <a href="/">
              <img
                src={logo}
                alt="CMC"
                style={{ width: "150px", height: "auto", marginRight: "10px" }}
              />
            </a>
            <h1
              className="nav-item"
              style={{ color: "white", fontSize: "30px", margin: 0 }}
            >
              CMC Restaurant
            </h1>
          </div>

          <div>
            <Link className="btn btn-dark" to="/users">
              Users
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
