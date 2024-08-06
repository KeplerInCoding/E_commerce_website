import React from "react";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

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
    </div>
  );
}

export default App;
