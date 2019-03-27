import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";

const addOrderPage = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      <main>
        <h1>Add Order Page</h1>
      </main>
    </>
  );
};

export default addOrderPage;
