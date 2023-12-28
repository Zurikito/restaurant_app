import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, IconButton, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { API_BASE_URL } from "../../config/config";

import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

import { updateCartTotalQuantity } from "../../redux/slice/cart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Cart = (props) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { _id } = useParams();
  const router = useNavigate();
  
 
  

  const dispatch = useDispatch();
  const { lengthCart } = useSelector((state) => {
    return {
      lengthCart: state.cart.count,
    };
  });
  

  const addToCart = async (id) => {
    try {
      // const tableValue = localStorage.getItem("table");
      await axios.post(`${API_BASE_URL}/api/carts/create`, {
        cart: {
          item_id: id,
          table_id: tableValue
        },
      });
      dispatch(updateCartTotalQuantity(lengthCart + 1));
    } catch {
      
    }
     window.location.reload();
  };
  
  const subtractToCart = async (id) => {
    try{
    await axios.delete(`${API_BASE_URL}/api/carts/delete/${id}`);

    dispatch(updateCartTotalQuantity(lengthCart - 1));
    } catch {
      
    }
    window.location.reload();
  };

  const groupByName = (data) => {
    const groupedItems = {};
    data.forEach((item) => {
      if (!groupedItems[item.name]) {
        groupedItems[item.name] = { ...item };
      } else {
        groupedItems[item.name].quantity += item.quantity;
      }
    });
    return Object.values(groupedItems);
  };

  const getCart = async () => {
    try {
      const tableValue = localStorage.getItem("table");
      const response = await axios.get(`${API_BASE_URL}/api/carts/` + tableValue);
      const cartData = response.data.data;
      const groupedCart = groupByName(cartData); //Nhận biết số lượng bao nhiêu món
      setCart(groupedCart);
      const totalValue = groupedCart.reduce((total, item) => {
        const itemTotal = item.price * item.quantity;
        return total + itemTotal;
      }, 0);
      setTotal(totalValue);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (!isLoading) getCart();
    setLoading(true);
  }, [isLoading]);
 
  
  const handlePayment = () => {
    router("/payment");
  };
  const tableValue = localStorage.getItem("table");
  return (
    <div>
      <div
        className="mt-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 100px",
        }}>
        
    <div className="container">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <h1 style={{marginLeft: "520px"}}>CART / TABLE {tableValue}
            <Link className="btn btn-dark" style={{marginLeft: "420px"}} to={`/cart/${tableValue}`}>
              <Badge badgeContent={lengthCart} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
         </h1>
        </div>
      </div>
    </div>
    
      </div>
      <div className="container">
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col" style={{ width: "50px" }}>
                #
              </th>

              <th scope="col" style={{ width: "150px" }}>
                Name
              </th>

              <th scope="col" style={{ width: "80px" }}>
                Type
              </th>
              <th scope="col" style={{ width: "100px" }}>
                Price (vnd)
              </th>
              <th scope="col" style={{ width: "20px" }}>
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {index + 1}
                </td>

                <td
                  style={{
                    textAlign: "left",
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.name}
                </td>

                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.type}
                </td>
                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </td>

                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    borderRight: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <IconButton
                      size="small"
                      aria-label="increase"
                      onClick={() => {
                        addToCart(item.menu_id);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: "18px" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      aria-label="reduce"
                      onClick={() => {
                        subtractToCart(item.id);
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="h4" style={{ backgroundColor: "#fff", color: "#000" }}>
          Total: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </p>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/menu");
            }}
          >
            Back
          </Button>

          <Link to="/payment">
            <button
              className="btn btn-success"
              style={{ marginLeft: "10px" }}
              onClick={() => handlePayment()}
            >
              Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
