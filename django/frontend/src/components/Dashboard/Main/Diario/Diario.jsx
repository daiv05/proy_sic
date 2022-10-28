import React, { useContext } from "react";
import "./diario.css";
import { Table, Form, FormGroup, Label, Input, Button } from "reactstrap";
import SideBarContext from "../../../../context/sideBarContext";

export default function Diario() {
  const { isOpen } = useContext(SideBarContext);

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
                <th>Monto</th>
                <th>Descripción</th>
                <th>Código Cuenta</th>
                <th>Cuenta</th>
                <th>Debe</th>
                <th>Haber</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>2022-10-20</td>
                <td>$500</td>
                <td>Compra de mercadería</td>
                <td>1001</td>
                <td>Compra</td>
                <td>15000</td>
                <td>0</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>2022-10-20</td>
                <td>$500</td>
                <td>Salida de caja</td>
                <td>1001</td>
                <td>Caja</td>
                <td>0</td>
                <td>15000</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </section>
  );
}
