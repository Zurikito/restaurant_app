import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";

const Detail = ({ name, quantity, price }) => {
  const formattedPrice = price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', padding: '5px' }}>
      <Typography variant="body1" style={{ flex: 1, textAlign: 'left', marginLeft: '10px' }}>{name}</Typography>
      <Typography variant="body1" style={{ flex: 1, textAlign: 'right', marginRight: '27px' }}>{quantity}</Typography>
      <Typography variant="body1" style={{ flex: 1, textAlign: 'right', marginRight: '10px' }}>{formattedPrice}</Typography>
    </div>
  );
};



const PaymentPage = () => {
  const tableValue = localStorage.getItem("table");
  const [cartCurrent, setCartCurrent] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);

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
      
      const response = await axios.get(`${API_BASE_URL}/api/carts/` + tableValue);
      const cartData = response.data.data;
      setCartCurrent(cartData);
      const groupedCart = groupByName(cartData);
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
  const route = useNavigate();

  const handlePayment = async () => {
  
    const foods = cartCurrent
      .filter((item) => item.type === "food")
      .map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        };
      });

    const drinks = cartCurrent
      .filter((item) => item.type === "drink")
      .map((item) => {
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        };
      });
    const body = {
      bill: {
        bill_num: 1,
        food_items: foods,
        drink_items: drinks,
        total: total,
      },
    };

    const result = await axios.post(`${API_BASE_URL}/api/bills/create/`, body);
    if(result){
      alert("PaymentSuccess")
      window.location.href = "/seating"
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" py={3}>
        Payment / Table {tableValue}
      </Typography>
      <Card sx={{ padding: 3 }} elevation={5}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" style={{marginBottom:"30px"}}>
              Order Summary
            </Typography>
            <Stack direction="row" justifyContent="space-between" px={2}>
              <Typography variant="body1" fontWeight="bold" style={{marginLeft:"25px"}}>
                Name
              </Typography>
              <Typography variant="body1" fontWeight="bold" style={{marginLeft:"95px"}}>
                Quantity
              </Typography>
              <Typography variant="body1" fontWeight="bold" style={{marginRight:"20px"}}>
                Total
              </Typography>
            </Stack>
            <Divider sx={{ backgroundColor: "black", margin: "8px 8px" }} />
            {cart.map((item) => (
              <Detail
                name={item.name}
                quantity={item.quantity}
                price={item.price * item.quantity}
                key={item.id}
              />
            ))}
           
            <Divider
              sx={{ backgroundColor: "black", margin: "90px 8px 8px 8px" }}
            />
            <Stack direction="row" justifyContent="space-between" px={2}>
              <Typography variant="body1" fontWeight="bold" fontSize="25px"> 
                Total price: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" fontWeight="bold">
              Payment method
            </Typography>

            <RadioGroup row name="row-radio-buttons-group">
              <FormControlLabel value="cash" control={<Radio />} label="Cash" style={{marginLeft:"100px"}}/>
              <FormControlLabel value="visa" control={<Radio />} label="Visa" />
              <FormControlLabel
                value="master card"
                control={<Radio />}
                label="Master card"
              />
            </RadioGroup>
            <div className="d-flex justify-content-center align-items-center gap-5">
              <Button
                variant="contained"
                onClick={() => route(`/cart/${tableValue}`)}
              >
                Back
              </Button>
              <Button variant="contained" onClick={handlePayment}>
                Confirm
              </Button>
            </div>
          </Grid>
        </Grid>
      </Card>
      <Box sx={{ height: 50 }}></Box>
    </Container>
  );
};

export default PaymentPage;
