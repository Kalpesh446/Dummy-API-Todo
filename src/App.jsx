import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FormData } from "./Form/FormData";
import Login from "./Form/Login";
import { Route, Routes } from "react-router-dom";
import { ShowData } from "./Form/ShowData";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/showData" element={<ShowData />}></Route>
        {/* <FormData /> */}
      </Routes>
    </>
  );
}

export default App;
