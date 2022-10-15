import React from "react";
import "./sidebar.css";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__brand">
        <p>Bookkeping</p>
      </div>
      <div className="sidebar__content p-4">
        <li>
          <a href="#home">Transaction</a>
        </li>
        <li>
          <a href="#home"> General Journal</a>
        </li>
        <li>
          <a href="#home">General Ledger</a>
        </li>
      </div>
    </div>
  );
}
