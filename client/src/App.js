import "./App.css";
import Header from "./views/header.js";
import Login from "./components/Login";
import Menu from "./components/Menu/Menu";
import Editingitem from "./components/Menu/Editingitem.js";
import Addingitem from "./components/Menu/Addingitem.js";
import Deletingitem from "./components/Menu/Deletingitem.js";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Editinguser from "./components/Users/Editinguser.js";
import Addinguser from "./components/Users/Addinguser.js";
import Deletinguser from "./components/Users/Deletinguser.js";
import Seating from "./components/Seating/Seating.js";
import Cart from "./components/Cart/Cart.js";
import Payment from "./components/Bill/Bill.js";
import { Routes, Route } from "react-router-dom";

import { Helmet } from "react-helmet";
import Addingtable from "./components/Seating/Addingtable.js";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>CMC Restaurant</title>
      </Helmet>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/menu"
          element={
            <>
              <Header />
              <Menu />
            </>
          }
        />
        <Route
          path="/menu/:_id/edit"
          element={
            <>
              <Header />
              <Editingitem />
            </>
          }
        />
        <Route
          path="/menu/add"
          element={
            <>
              <Header />
              <Addingitem />
            </>
          }
        />
        <Route
          path="/menu/:_id/delete"
          element={
            <>
              <Header />
              <Deletingitem />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <Header />
              <Users />
            </>
          }
        />
        <Route
          path="/users/:_id"
          element={
            <>
              <Header />
              <User />
            </>
          }
        />
        <Route
          path="/users/:_id/edit"
          element={
            <>
              <Header />
              <Editinguser />
            </>
          }
        />
        <Route
          path="/users/add"
          element={
            <>
              <Header />
              <Addinguser />
            </>
          }
        />
        <Route
          path="/users/:_id/delete"
          element={
            <>
              <Header />
              <Deletinguser />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route
          path="/cart/:_id"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Payment />
            </>
          }
        />
        <Route
          path="/seating"
          element={
            <>
              <Header />
              <Seating />
            </>
          }
        />
        <Route
          path="/seating/add"
          element={
            <>
              <Header />
              <Addingtable />
            </>
          }
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
