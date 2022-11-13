import React, { useContext } from "react";
import "./sidebar.css";
import closeIcon from "./../../../img/close.svg";
import { NavLink } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
import SideBarContext from "../../../context/sideBarContext";
export default function Sidebar() {
  const { isOpen, toggleMenu } = useContext(SideBarContext);
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
        <ul>
          <li>
            Contabilidad General <FiBookOpen />
          </li>
          <hr className="border border-secondary border-1 opacity-100" />
          <li>
            <NavLink
              to="/transaction/new"
              style={({ isActive }) => ({
                borderLeft: isActive && "4px solid #3c7fcceb",
                transition: "border-width 0.2s linear",
              })}
            >
              Transacción
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/libroDiario/list"
              style={({ isActive }) => ({
                borderLeft: isActive && "4px solid #3c7fcceb",
                transition: "border-width 0.2s linear",
              })}
            >
              Libro diario
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cuentas/list"
              style={({ isActive }) => ({
                borderLeft: isActive && "4px solid #3c7fcceb",
                transition: "border-width 0.2s linear",
              })}
            >
              Cuentas
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/mayor/list"
              style={({ isActive }) => ({
                borderLeft: isActive && "4px solid #3c7fcceb",
                transition: "border-width 0.2s linear",
              })}
            >
              Libro Mayor
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/balance"
              style={({ isActive }) => ({
                borderLeft: isActive && "4px solid #3c7fcceb",
                transition: "border-width 0.2s linear",
              })}
            >
              Balance Comprobación
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
