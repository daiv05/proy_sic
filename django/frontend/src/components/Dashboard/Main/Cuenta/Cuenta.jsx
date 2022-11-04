import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Spinner,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import SideBarContext from "../../../../context/sideBarContext";
import { FiPlus } from "react-icons/fi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import "./cuenta.css";
export const Cuenta = () => {
  const { isOpen } = useContext(SideBarContext);
  const [cuenta, setCuenta] = useState([]);
  const [mayor, setMayor] = useState([]);
  const [open, setOpen] = useState("");
  const [modal, setModal] = useState(false);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const toggleModal = () => setModal(!modal);
  const getCuentas = async () => {
    try {
      const { data } = await axios.get("/cuentas/");
      setCuenta(data);
    } catch (error) {
      console.log(error.message);
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    const [codigo_cuenta, tipocuenta, nombre_cuenta] = [
      ...new FormData(e.target).entries(),
    ];

    axios
      .post("/cuentas/", {
        codigo_cuenta: codigo_cuenta[1],
        tipocuenta: tipocuenta[1],
        nombre_cuenta: nombre_cuenta[1],
      })
      .then(() => getCuentas())
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Cuenta registrada correctamente",
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong`,
        });
      });
    e.target.reset();
  };
  useEffect(() => {
    getCuentas();
    getMayor();
  }, []);
  return (
    <section
      className={
        isOpen ? "cuentas-container p-4 z-index-3" : "cuentas-container p-4"
      }
    >
      <h1>Cuentas</h1>
      <div className="options-cuentas mb-3">
        <Button color="warning" onClick={() => toggleModal()}>
          Agregar cuenta <FiPlus style={{ fontSize: "1.2rem" }} />
        </Button>
      </div>
      {!mayor.length ? (
        <div className="spinner-container d-flex justify-content-center">
          <Spinner color="dark" type="grow">
            Loading...
          </Spinner>
        </div>
      ) : (
        cuenta.map((data, key) => {
          return (
            <Accordion
              open={open || ""}
              toggle={toggle}
              key={key + 1}
              className="mb-2"
            >
              <AccordionItem>
                <AccordionHeader targetId={(key + 1).toString()}>
                  {data.codigo_cuenta} - {data.nombre_cuenta}
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
                      {mayor
                        .filter(
                          (may) => may.idcuenta.idcuenta === data.idcuenta
                        )
                        .map((e, key) => {
                          return (
                            <tr key={key}>
                              <td>1</td>
                              <td>{`$${parseFloat(e.sum_debe).toFixed(2)}`}</td>
                              <td>{`$${parseFloat(e.sum_haber).toFixed(
                                2
                              )}`}</td>
                              <td>{`$${parseFloat(e.saldo).toFixed(2)}`}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          );
        })
      )}
      {
        <Modal isOpen={modal} toggle={toggleModal} role="dialog">
          <ModalHeader toggle={() => toggleModal()}>New account</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => handleOnSubmit(e)}>
              <FormGroup>
                <Label for="codigo_cuenta">Codigo cuenta</Label>
                <Input
                  type="number"
                  name="codigo_cuenta"
                  id="codigo_cuenta"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="tipocuenta">Tipo cuenta</Label>
                <Input type="text" name="tipocuenta" id="tipocuenta" required />
              </FormGroup>
              <FormGroup>
                <Label for="nombre_cuenta">Nombre cuenta</Label>
                <Input
                  type="text"
                  name="nombre_cuenta"
                  id="nombre_cuenta"
                  required
                />
              </FormGroup>
              <Button type="submit" color="success" className="w-100">
                Guardar cuenta
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => toggleModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      }
    </section>
  );
};
