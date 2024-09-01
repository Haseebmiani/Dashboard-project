import React from "react";
import { Route, Routes } from "react-router-dom";
import SingUp from "./component/SingUp";
import Nav from "./component/Nav";
import PraviteComponent from "./component/PraviteComponent";
import Login from "./component/Login";
import Addproduct from "./component/Addproduct";
import Productlist from "./component/Productlist";
import UpdateProduct from "./component/UpdateProduct";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route element={<PraviteComponent />}>
          <Route path="/" element={<Productlist />} />
          <Route path="/add" element={<Addproduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route
            path="/log-out"
            element={
              <h1 className=" text-4xl  mt-10">Logout Product Component</h1>
            }
          />
          <Route
            path="/profile"
            element={<h1 className=" text-4xl  mt-10">Profile Component</h1>}
          />
        </Route>

        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/log-up" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
