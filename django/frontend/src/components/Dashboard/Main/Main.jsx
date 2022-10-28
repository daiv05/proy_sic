import React from "react";
import { Route, Routes } from "react-router-dom";
import Diario from "./Diario/Diario";
import Home from "./Home/Home";
import Transaction from "./Transaction/Transaction";
import Cuenta from "./Cuenta/Cuenta";
export default function Main({ isOpen }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transaction/new" element={<Transaction />} />
      <Route path="/libroDiario/list" element={<Diario />} />
      <Route path="/cuentas/list" element={<Cuenta />} />
    </Routes>
  );
}
