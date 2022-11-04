import React, { useContext } from "react";
import "./diario.css";
import { Table, Form, FormGroup, Label, Input, Button } from "reactstrap";
import SideBarContext from "../../../../context/sideBarContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Diario() {
  const { isOpen } = useContext(SideBarContext);
  const [diario, setDiario] = useState([]);

  const getDiaro = async () => {
    try {
      const { data } = await axios.get("/diario/");
      setDiario(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getDiaro();
  }, []);
  return (
    <section
      className={isOpen ? "libro-diario p-4 z-index-3" : "libro-diario p-4"}
    >
      <h1>Libro diario</h1>
      <div className="options">
        <Form className="d-flex flex-column flex-sm-row gap-3  align-items-sm-center">
          <FormGroup>
            <Label for="dateDesde">Desde</Label>
            <Input
              id="dateDesde"
              name="datetime"
              placeholder="datetime placeholder"
              type="date"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="dateHasta">Hasta</Label>
            <Input
              id="dateHasta"
              name="datetime"
              placeholder="datetime placeholder"
              type="date"
            ></Input>
          </FormGroup>
          <Button color="dark" type="submit">
            Filtrar
          </Button>
        </Form>
      </div>
      <div className="table-container row">
        <div className="col-12">
          <Table bordered borderless hover responsive size="" striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Descripción</th>
                <th>Código Cuenta</th>
                <th>Cuenta</th>
                <th>Debe</th>
                <th>Haber</th>
              </tr>
            </thead>
            <tbody>
              {diario.length ? (
                diario.map((e, key) => {
                  return (
                    <tr key={key}>
                      <td>{e.iddiario}</td>
                      <td>{e.fecha_registro}</td>
                      <td>{e.concepto}</td>
                      <td>{e.idcuenta.codigo_cuenta}</td>
                      <td>{e.idcuenta.nombre_cuenta}</td>
                      <td>{e.cargo ? parseInt(e.monto).toFixed(2) : 0}</td>
                      <td>{!e.cargo ? parseInt(e.monto).toFixed(2) : 0}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No hay datos que mostrar ...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
}
