import React from "react";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/Footer";
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Products from "./pages/Products";
import LoginSignup from "./pages/LoginSignup";

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div className=" bg-gray-300">
      <Navbar/>
      


      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:keyword?" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login-signup" element={<LoginSignup />} />
      </Routes>


      {location.pathname !== '/search' && <Footer />}
    </div>
  );
}

export default App;
