import React, { useState, useContext } from "react";
import withReactContent from "sweetalert2-react-content";
import SideBarContext from "../../../../context/sideBarContext";
import { Form, FormGroup, Input, Label, Button, Table } from "reactstrap";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import axios from "axios";
import "./transaction.css";
import { useEffect } from "react";

export default function Transaction() {
  const { isOpen } = useContext(SideBarContext);
  const [formData, setFormData] = useState([]);
  const [cuenta, setCuenta] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const [fecha, idcuenta, cargo, monto] = [...data.entries()];
    const test = [...data.entries()];
    console.log(test);
    const montoIvaValidation = data.has("iva")
      ? parseFloat(monto[1]) * 0.13 + parseFloat(monto[1]) || 0
      : parseFloat(monto[1]) || 0;
    setFormData([
      ...formData,
      {
        fecha_registro: fecha[1],
        idcuenta: idcuenta[1].split(",")[0],
        nombre_cuenta: idcuenta[1].split(",")[1],
        cargo: cargo[1] === "Debe" ? true : false,
        monto: montoIvaValidation,
        concepto: data.get("descripcion"),
      },
    ]);
    e.target.reset();
  };
  const getCuentas = async () => {
    try {
      const { data } = await axios.get("/cuentas/");
      setCuenta(data);
    } catch (error) {
      console.log(error.message);
    }
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
    console.log(formData);
    if (montoDebe === montoHaber) {
      formData.forEach((element, key) => {
        axios.post("/diario/", formData[key]).then((response) => {
          console.log(response);
          if (key === formData.length - 1) {
            MySwal.fire({
              icon: "success",
              title: "Transacciones registradas correctamente",
            });
            setFormData([]);
          }
        });
      });
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "No cumple el principio de dualidad",
      });
    }
  };

  useEffect(() => {
    getCuentas();
  }, []);
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
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Seleccionar cuenta</Label>
              <div className="row">
                <div className="col-6">
                  <Input id="listCuentas" name="cuenta" type="select" required>
                    {cuenta.map((value, key) => {
                      return (
                        <option
                          value={[value.idcuenta, value.nombre_cuenta]}
                          key={key}
                        >
                          {value.nombre_cuenta}
                        </option>
                      );
                    })}
                  </Input>
                </div>
                <div className="col-6">
                  <Input
                    id="debeHaberOptions"
                    name="debeHaber"
                    type="select"
                    required
                  >
                    <option>Debe</option>
                    <option>Haber</option>
                  </Input>
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="monto">Monto</Label>
              <Input type="number" id="monto" name="monto" required></Input>
            </FormGroup>
            <FormGroup>
              <Label for="monto">IVA (13%)</Label>{" "}
              <Input type="checkbox" id="iva" name="iva"></Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripcion</Label>
              <Input
                type="textarea"
                id="description"
                name="descripcion"
                required
              />
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
                formData.map((datForm, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{datForm.nombre_cuenta}</td>
                      <td>{datForm.cargo ? datForm.monto : 0}</td>
                      <td>{!datForm.cargo ? datForm.monto : 0}</td>
                      <td>
                        <FiTrash2
                          className="icon-delete"
                          onClick={() => handleDelete(key + 1)}
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
