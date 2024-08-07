import React from "react";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/Footer";
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div className="">
      <Navbar/>
      


      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/phobias" element={<Home/>}></Route>
        <Route path="/chatbot" element={<Home/>}></Route>
        <Route path="/explore" element={<Home/>}></Route>
      </Routes>


      <Footer/>
    </div>
  );
}

export default App;
