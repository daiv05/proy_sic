import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Spinner,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import SideBarContext from "../../../../context/sideBarContext";
import "./mayor.css";
export default function Mayor() {
  const { isOpen } = useContext(SideBarContext);
  const [mayor, setMayor] = useState([]);
  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const getMayor = async () => {
    try {
      const { data } = await axios.get("/mayor/");
      setMayor(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMayor();
  }, []);
  return (
    <section
      className={
        isOpen ? "cuentas-container p-4 z-index-3" : "cuentas-container p-4"
      }
    >
      <h1>Libro Mayor</h1>

      {!mayor.length ? (
        <div className="spinner-container d-flex justify-content-center">
          <Spinner color="dark" type="grow">
            Loading...
          </Spinner>
        </div>
      ) : (
        mayor.map((data, key) => {
          return (
            <Accordion
              open={open || ""}
              toggle={toggle}
              key={key + 1}
              className="mb-2"
            >
              <AccordionItem>
                <AccordionHeader targetId={(key + 1).toString()}>
                  {data.idcuenta.codigo_cuenta} - {data.idcuenta.nombre_cuenta}
                </AccordionHeader>
                <AccordionBody accordionId={(key + 1).toString()}>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Debe</th>
                        <th>Haber</th>
                        <th>Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>{`$${parseFloat(data.sum_debe).toFixed(2)}`}</td>
                        <td>{`$${parseFloat(data.sum_haber).toFixed(2)}`}</td>
                        <td>{`$${parseFloat(data.saldo).toFixed(2)}`}</td>
                      </tr>
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          );
        })
      )}
    </section>
  );
}
