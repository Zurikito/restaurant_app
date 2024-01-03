import React, { useEffect, useState } from "react";
import {
  ToggleButtonGroup,
  Box,
  Button,
  Card,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import image from "../../img/table.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";
const Table = ({ value, onClick, selected }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        padding: 4,
        cursor: "pointer",
        transition: "transform .5s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        backgroundColor: selected ? "#175303" : "white",
      }}
      elevation={10}
    >
      <CardMedia component="img" height="194" image={image} alt="table" />
      <Typography
        mt={2}
        variant="h6"
        fontWeight="bold"
        sx={{
          color: selected ? "#f3f3f3" : "black",
        }}
      >
        Table {value}
      </Typography>
    </Card>
  );
};

const Seating = () => {
  const router = useNavigate();
  const [tableSelected, setTableSelected] = useState(null);
  const [tables, setTables] = useState([]);
  // const tables = Array.from(Array(10).keys());
  const fetchSeating = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/seating/getallseating`);
      console.log(response.data.data); 
      setTables(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    

    fetchSeating();
  }, []);

  const navigate = useNavigate();

  //const handleDeleteTable = async (id) => {
    //console.log(id);
   // try {
      //const response = await axios.get(`${API_BASE_URL}/api/seating/deletetable/${id}`);
     // console.log(response); 
      // Thực hiện các xử lý khác nếu cần
    //} catch (error) {
     // console.error("Error deleting data:", error.response.data); // In ra lỗi phản hồi từ API
      // Thực hiện xử lý lỗi khác nếu cần
    //}
 // };

  const handleAddTable = (id) => {
    navigate("/seating/add");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" my={4}>
        Choose the table you want to order
      </Typography>

      <Grid container spacing={4}>
        {tables?.map((table) => (
          <Grid item xs={12} sm={6} md={4} key={table}>
            <Table
              value={Number(table.num)}
              onClick={() => {
                setTableSelected(Number(table.num));
                localStorage.setItem("table", Number(table.num));
              }}
              selected={tableSelected === Number(table.num)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <button
          variant="contained"
          className="btn btn-primary"
          onClick={() => router(`/menu`)}
          disabled={tableSelected == null}
          style={{ marginRight: '10px' }}
        >
          Continue
        </button>
        <button
          className="btn btn-success"
          variant="contained"
          onClick={handleAddTable}
        >
          Add Table
        </button>
      </Box>

      <Box sx={{ height: 50 }}></Box>
    </Container>
  );
};

export default Seating;
