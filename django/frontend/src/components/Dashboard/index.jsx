import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";
import NavbarContainer from "./Navbar/Navbar";

export default function Dashboard() {
  
  return (
    <section className="wrapper">
      <NavbarContainer />
      <div className="d-flex">
        <Sidebar />
        <Main />
      </div>
    </section>
  );
}
