import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";
import NavbarContainer from "./Navbar/Navbar";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <section className="wrapper">
      <NavbarContainer toggleMenu={toggleMenu} />
      <div className="d-flex">
        <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
        <Main />
      </div>
    </section>
  );
}
