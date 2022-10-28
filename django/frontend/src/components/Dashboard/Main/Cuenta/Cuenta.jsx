import React from "react";
import { useState, useContext } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import SideBarContext from "../../../../context/sideBarContext";
import "./cuenta.css";
export default function Diario() {
  const [cuenta, setCuenta] = useState([
    {
      codigo: 1103,
      cuenta: "IVA Crédito Fiscal",
    },
    {
      codigo: 2106,
      cuenta: "IVA Débito Fiscal",
    },
    {
      codigo: 110101,
      cuenta: "Caja General",
    },
    {
      codigo: 110103,
      cuenta: "Bancos",
    },
  ]);
  const { isOpen } = useContext(SideBarContext);
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <section
      className={
        isOpen ? "cuentas-container p-4 z-index-3" : "cuentas-container p-4"
      }
    >
      <h1>Cuentas</h1>
      {cuenta.map((data, key) => {
        return (
          <Accordion
            open={open || ""}
            toggle={toggle}
            key={key + 1}
            className="mb-2"
          >
            <AccordionItem>
              <AccordionHeader targetId={(key + 1).toString()}>
                {data.codigo} - {data.cuenta}
              </AccordionHeader>
              <AccordionBody accordionId={(key + 1).toString()}>
                <strong>This is the first item&#39;s accordion body.</strong>
                You can modify any of this with custom CSS or overriding our
                default variables. It&#39;s also worth noting that just about
                any HTML can go within the <code>.accordion-body</code>, though
                the transition does limit overflow.
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        );
      })}
    </section>
  );
}
