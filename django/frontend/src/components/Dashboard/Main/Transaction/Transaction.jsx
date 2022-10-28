import React, { useState, useContext } from "react";
import withReactContent from "sweetalert2-react-content";
import SideBarContext from "../../../../context/sideBarContext";
import { Form, FormGroup, Input, Label, Button, Table } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import "./transaction.css";

export default function Transaction() {
  const { isOpen } = useContext(SideBarContext);
  const [formData, setFormData] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const [fecha, tipoCuenta, debeHaber, monto, descripcion] = [
      ...data.entries(),
    ];
    const montoIvaValidation = data.has("iva")
      ? parseInt(monto[1]) * 0.13 + parseInt(monto[1]) || 0
      : parseInt(monto[1]) || 0;
    setFormData([
      ...formData,
      {
        id: Math.floor(Math.random() * 10000),
        fecha: fecha[1],
        tipoCuenta: tipoCuenta[1],
        debeHaber: debeHaber[1],
        monto: montoIvaValidation,
        descripcion: descripcion[1] || "Descripción no adjuntada",
      },
    ]);
  };
  const handleDelete = (id) => {
    setFormData(formData.filter((data) => data.id !== id));
  };
  const handleDualidad = () => {
    const MySwal = withReactContent(Swal);
    const montoDebe = formData
      .filter((data) => data.debeHaber === "Debe")
      .reduce((prev, curr) => prev + curr.monto, 0);
    const montoHaber = formData
      .filter((data) => data.debeHaber === "Haber")
      .reduce((prev, curr) => prev + curr.monto, 0);

    if (montoDebe === montoHaber) {
      MySwal.fire("Good job!", "You clicked the button!", "success");
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "No cumple el principio de dualidad",
      });
    }
  };
  return (
    <section
      className={
        isOpen
          ? "transaction-container p-4 z-index-3"
          : "transaction-container p-4"
      }
    >
      <h1>Nueva transacción</h1>
      <div className="row">
        <div className="col-12 col-lg-4">
          <Form className="form-container__inside p-3" onSubmit={onSubmit}>
            <FormGroup>
              <Label id="dateTransaction">Fecha</Label>
              <Input
                type="date"
                id="dateTransaction"
                name="fechaTransaccion"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Seleccionar cuenta</Label>
              <div className="row">
                <div className="col-6">
                  <Input id="listCuentas" name="cuenta" type="select">
                    <option>IVA debito fiscal</option>
                    <option>Caja</option>
                    <option>Compra</option>
                  </Input>
                </div>
                <div className="col-6">
                  <Input id="debeHaberOptions" name="debeHaber" type="select">
                    <option>Debe</option>
                    <option>Haber</option>
                  </Input>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="monto">Monto</Label>
              <Input type="number" id="monto" name="monto"></Input>
            </FormGroup>
            <FormGroup>
              <Label for="monto">IVA (13%)</Label>{" "}
              <Input type="checkbox" id="iva" name="iva"></Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripcion</Label>
              <Input type="textarea" id="description" name="descripcion" />
            </FormGroup>
            <Button type="submit" color="dark">
              Agregar
            </Button>
          </Form>
        </div>
        <div className="mt-4 col-12 col-lg-8">
          <Table bordered borderless hover responsive striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Cuenta</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {formData.length ? (
                formData.map((datForm) => {
                  return (
                    <tr key={datForm.id}>
                      <td>{datForm.id}</td>
                      <td>{datForm.tipoCuenta}</td>
                      <td>
                        {datForm.debeHaber === "Debe" ? datForm.monto : 0}
                      </td>
                      <td>
                        {datForm.debeHaber === "Haber" ? datForm.monto : 0}
                      </td>
                      <td>
                        <FiTrash2
                          className="icon-delete"
                          onClick={() => handleDelete(datForm.id)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    Aún no hay transacciones ...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Button
            color="success"
            disabled={!formData.length ? true : false}
            onClick={handleDualidad}
          >
            Registrar transacciones
          </Button>
        </div>
      </div>
    </section>
  );
}
