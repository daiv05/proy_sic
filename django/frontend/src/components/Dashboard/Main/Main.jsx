import React from "react";
import { Route, Routes } from "react-router-dom";
import Diario from "./Diario/Diario";
import Home from "./Home/Home";
import Transaction from "./Transaction/Transaction";
import Mayor from "./Mayor/Mayor";
import { Cuenta } from "./Cuenta/Cuenta";
import { Balance } from "./Balance/Balance";
export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transaction/new" element={<Transaction />} />
      <Route path="/libroDiario/list" element={<Diario />} />
      <Route path="/mayor/list" element={<Mayor />} />
      <Route path="/cuentas/list" element={<Cuenta />} />
      <Route path="/balance" element={<Balance />} />
    </Routes>
  );
}
