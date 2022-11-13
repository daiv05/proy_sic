import React, { useContext, useEffect, useState } from "react";
import { Table, Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import SideBarContext from "../../../../context/sideBarContext";
import "./balance.css";
export const Balance = () => {
  const { isOpen } = useContext(SideBarContext);
  const [mayor, setMayor] = useState([]);

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
        isOpen ? "balances-container p-4 z-index-3" : "balances-container p-4 "
      }
    >
      <h1>Balance de Comprobación</h1>
      <Table
        bordered
        borderless
        hover
        responsive
        size="sm"
        striped
        className="mt-2"
      >
        <thead>
          <tr>
            <th>N° Cuenta</th>
            <th>Concepto</th>
            <th>Deudor</th>
            <th>Acreedor</th>
          </tr>
        </thead>
        <tbody>
          {mayor.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.idcuenta.codigo_cuenta}</td>
                <td>{e.idcuenta.nombre_cuenta}</td>
                <td>
                  {e.idcuenta.tipocuenta === "Activo" &&
                    `${parseFloat(e.saldo).toFixed(2)}`}
                </td>
                <td>
                  {e.idcuenta.tipocuenta !== "Activo" &&
                    `${parseFloat(e.saldo).toFixed(2)}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="balance-saldos d-flex justify-content-start">
        <Card
          color="dark"
          style={{
            width: "20rem",
            alignContent: "end",
          }}
        >
          <CardHeader
            style={{ fontSize: "1.2rem", fontWeight: "600", color: "#FFF" }}
          >
            Saldos
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem>
              DEUDOR : $
              {mayor
                .filter((e) => e.idcuenta.tipocuenta === "Activo")
                .reduce((prev, acum) => prev + parseFloat(acum.saldo), 0)}{" "}
            </ListGroupItem>
            <ListGroupItem>
              ACREEDOR : $
              {mayor
                .filter((e) => e.idcuenta.tipocuenta !== "Activo")
                .reduce((prev, acum) => prev + parseFloat(acum.saldo), 0)}
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    </section>
  );
};
