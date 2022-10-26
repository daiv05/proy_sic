import React from "react";
import { Route, Routes } from "react-router-dom";
import Diario from "./Diario/Diario";
import Home from "./Home/Home";
import Transaction from "./Transaction/Transaction";
export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/newTransaction" element={<Transaction />} />
      <Route path="/libroDiario" element={<Diario />} />
    </Routes>
  );
}
