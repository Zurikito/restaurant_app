import React, { useState } from "react";
import { ToggleButtonGroup, Box, Button, Card, Container, Typography, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import image from '../../img/table.jpg'
import { useNavigate } from "react-router-dom";

const Table = ({ value, onClick, selected }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        padding: 4,
        cursor: "pointer",
        transition: "transform .5s",
        "&:hover": {
          transform: "scale(1.05)"
        },
        backgroundColor: selected ? "#175303" : "white"
      }} elevation={10}>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="table"
      />
      <Typography mt={2} variant="h6" fontWeight="bold" sx={{
        color: selected ? "#f3f3f3" : "black"
      }}>Table {value}</Typography>
    </Card>
  );
};

const Seating = () => {
  const router = useNavigate()
  const [tableSelected, setTableSelected] = useState(null)
  const tables = Array.from(Array(10).keys())

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" my={4}>Choose the table you want to order</Typography>

      <Grid container spacing={4} >
        {tables.map((table) => <Grid item xs={12} sm={6} md={4} key={table} >
          <Table value={table + 1} onClick={() => {
            setTableSelected(table + 1)
            localStorage.setItem('table', table + 1);
          }} selected={tableSelected === table + 1} />
        </Grid>)}
      </Grid>
      <Button variant="contained" style={{ marginTop: "2rem" }} mb={10} mt={2} onClick={() => router(`/menu`)} disabled={tableSelected == null}>Continue</Button>
      <Box sx={{ height: 50 }}></Box>
    </Container>
  );
};

export default Seating;
