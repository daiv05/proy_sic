import React from "react";
import "./sidebar.css";
import closeIcon from "./../../../img/close.svg";
export default function Sidebar({ isOpen, toggleMenu }) {
  return (
    <div className={isOpen ? "openSide" : "sidebar d-none d-md-block"}>
      <div className={isOpen ? "backmenu" : ""}></div>
      <div
        className={
          isOpen
            ? "sidebar__brand d-flex align-items-center justify-content-between"
            : "d-none"
        }
      >
        <p>Settings</p>
        <img
          src={closeIcon}
          alt="close"
          className="closeIcon"
          onClick={toggleMenu}
        />
      </div>
      <div className="sidebar__content p-4">
        <li>
          <a href="#home">Transacción</a>
        </li>
        <li>
          <a href="#home">Libro diario</a>
        </li>
        <li>
          <a href="#home">Cuentas</a>
        </li>
      </div>
    </div>
  );
}
