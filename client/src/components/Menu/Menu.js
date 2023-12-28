import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCartTotalQuantity } from "../../redux/slice/cart";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../config/config";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CenterFocusStrong } from "@mui/icons-material";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const { _id } = useParams();

  const dispatch = useDispatch();
  const { lengthCart } = useSelector((state) => {
    return {
      lengthCart: state.cart.count,
    };
  });


  const getCart = async () => {
    try {
      const tableValue = localStorage.getItem("table");
      const response = await axios.get(`${API_BASE_URL}/api/carts/` + tableValue);
      dispatch(updateCartTotalQuantity(response.data.data.length));
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  
  const getMenu = async () => {
    try {
      await axios
        .get(`${API_BASE_URL}/api/menu`)
        .then((res) => setMenu(res.data.data));
    } catch {
      // window.location.reload();
    }
  };

  const addToCart = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/api/carts/create`, {
        cart: {
          item_id: id,
          table_id: localStorage.getItem("table")
        },
      });
      dispatch(updateCartTotalQuantity(lengthCart + 1));
    } catch {
      // window.location.reload();
    }
  };

  useEffect(() => {
    if (!isLoading) getMenu();
    setLoading(true);
  }, [isLoading]);

  const navigate = useNavigate();

  const handleDeleteItem = (id) => {
    navigate(`/menu/${id}/delete`);
  };

  const handleEditItem = (id) => {
    navigate(`/menu/${id}/edit`);
  };

  const handleAddCartItem = (id) => {
    addToCart(id);
  };

  const handleAddItem = (id) => {
    navigate("/menu/add");
  };

  const filteredMenu = menu.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const typeMatch = selectedType === "all" || item.type === selectedType;
    return nameMatch && typeMatch;
  });

  const sortedMenu = filteredMenu.sort((a, b) => {
    if (a.type === "food" && b.type !== "food") {
      return -1;
    } else if (a.type !== "food" && b.type === "food") {
      return 1;
    } else {
      return a.type.localeCompare(b.type);
    }
  });
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
        <div></div>
        
    <div className="container">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <h1 style={{marginLeft: "510px"}}>MENU / TABLE {tableValue}
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
        <div className="d-flex justify-content-center align-items-center mt-4 gap-5">
          <Button
            variant="contained"
            onClick={() => {
              localStorage.removeItem("table");
              navigate("/seating");
            }}
          >
            Back
          </Button>
          <input
            type="text"
            placeholder="Search item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mt-3 mb-3"
            style={{ width: "200px", height: "30px" }}
          />
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="all"
              checked={selectedType === "all"}
              onChange={() => setSelectedType("all")}
            />
            <span style={{ marginLeft: "5px" }}>All</span>
          </label>
          <span style={{ margin: "0 10px" }}></span>
          <label>
            <input
              type="radio"
              name="type"
              value="food"
              checked={selectedType === "food"}
              onChange={() => setSelectedType("food")}
            />
            <span style={{ marginLeft: "5px" }}>Food</span>
          </label>
          <span style={{ margin: "0 10px" }}></span>
          <label>
            <input
              type="radio"
              name="type"
              value="drink"
              checked={selectedType === "drink"}
              onChange={() => setSelectedType("drink")}
            />
            <span style={{ marginLeft: "5px" }}>Drink</span>
          </label>
        </div>

        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col" class="text-center" style={{ width: "50px" }}>
                #
              </th>
              <th scope="col" class="text-center" style={{ width: "200px" }}>
                Image
              </th>
              <th scope="col" class="text-center" style={{ width: "200px" }}>
                Name
              </th>
              <th scope="col" class="text-center" style={{ width: "400px" }}>
                Description
              </th>
              <th scope="col" class="text-center" style={{ width: "100px" }}>
                Type
              </th>
              <th scope="col" class="text-center" style={{ width: "150px" }}>
                Price (vnd)
              </th>
              <th scope="col" class="text-center" style={{ width: "250px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMenu.map((item, index) => (
              <tr key={item.id}>
                <td
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {index + 1}
                </td>
                <td style={{ borderLeft: "1px solid #dee2e6" }}>
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    style={{ width: "300px", height: "200px" }}
                  />
                </td>
                <td
                  class="text-center"
                  style={{
                    textAlign: "left",
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.name}
                </td>
                <td
                  class="text-center"
                  style={{
                    textAlign: "left",
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.description}
                </td>
                <td
                  class="text-center"
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.type}
                </td>
                <td
                  className="text-center"
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    verticalAlign: "middle",
                  }}
                >
                  {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </td>
                <td
                  class="text-center"
                  style={{
                    borderLeft: "1px solid #dee2e6",
                    borderRight: "1px solid #dee2e6",
                    verticalAlign: "left",
                  }}
                >
                  <button
                    className="btn btn-success"
                    style={{ marginRight: "10px", marginTop: "40px" }}
                    onClick={() => handleEditItem(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "5px", marginTop: "40px" }}
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{
                      marginLeft: "5px",
                      marginTop: "40px",
                      backgroundColor: "Orange",
                    }}
                    onClick={() => handleAddCartItem(item.id)}
                  >
                    Add to cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          variant="contained"
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default Menu;
