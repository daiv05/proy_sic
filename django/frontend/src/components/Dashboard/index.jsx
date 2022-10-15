import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";


export default function Dashboard() {
  return (
    <div className="wrapper d-flex ">
      <Sidebar />
      <Main />
    </div>
  );
}
