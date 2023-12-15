import './App.css';
import Header from './views/header.js'
import Login from './components/Login'
import Menu from './components/Menu/Menu'
import Editingitem from './components/Menu/Editingitem.js'
import Addingitem from './components/Menu/Addingitem.js';
import Deletingitem from './components/Menu/Deletingitem.js';
import Users from './components/Users/Users'
import User from './components/Users/User'
import Editinguser from './components/Users/Editinguser.js'
import Addinguser from './components/Users/Addinguser.js';
import Deletinguser from './components/Users/Deletinguser.js';
import { Routes, Route } from "react-router-dom";

import { Helmet } from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>CMC Restaurant</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/menu' element={<Menu />} />
          <Route path='/menu/:_id/edit' element={<Editingitem />} />
          <Route path='/menu/add' element={<Addingitem />} />
          <Route path='/menu/:_id/delete' element={<Deletingitem />} />
        <Route path='/users' element={<Users />} />
          <Route path='/users/:_id' element={<User />} />
          <Route path='/users/:_id/edit' element={<Editinguser />} />
          <Route path='/users/add' element={<Addinguser />} />
          <Route path='/users/:_id/delete' element={<Deletinguser />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
