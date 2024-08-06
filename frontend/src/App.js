import React from "react";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/Footer";

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
      <Footer/>
    </div>
  );
}

export default App;
