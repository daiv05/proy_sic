import React, { useState } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import imageTest from "../../../img/avatar.svg";
import "./navbar.css";

export default function NavbarContainer({ toggleMenu }) {
  const styles = {
    Toggler: {
      backgroundColor: "#dfcb16",
      borderRadius: "4px",
    },
    Image: {
      height: "30px",
      marginLeft: "5px",
    },
  };
  return (
    <>
      <Navbar className="navbarContainer">
        <NavbarBrand
          href="/"
          className="navbarBrand text-white d-none d-sm-block"
        >
          Bookkeping
        </NavbarBrand>
        <UncontrolledDropdown>
          <DropdownToggle caret color="dark">
            Kevin Grande
            <img src={imageTest} alt="test" style={styles.Image} />
          </DropdownToggle>
          <DropdownMenu dark>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem>Some Action</DropdownItem>
            <DropdownItem text>Dropdown Item Text</DropdownItem>
            <DropdownItem disabled>Action (disabled)</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Foo Action</DropdownItem>
            <DropdownItem>Bar Action</DropdownItem>
            <DropdownItem>Quo Action</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavbarToggler
          onClick={toggleMenu}
          style={styles.Toggler}
          className="d-md-none"
        />
      </Navbar>
    </>
  );
}
