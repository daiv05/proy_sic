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
import "./mayor.css";
export default function Mayor() {
  const { isOpen } = useContext(SideBarContext);
/*   const [cuenta, setCuenta] = useState([]); */
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
 /*  const getCuentas = async () => {
    try {
      const { data } = await axios.get("/cuentas/");
      setCuenta(data);
    } catch (error) {
      console.log(error.message);
    }
  }; */
  const getMayor = async () => {
    try {
      const { data } = await axios.get("/mayor/");
      setMayor(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

/*   const handleOnSubmit = (e) => {
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
      .then((response) => {
        console.log(response);
        response.status === 201
          ? MySwal.fire({
              icon: "success",
              title: "Cuenta registrada correctamente",
            })
          : MySwal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un error",
            });
      })
      .then(() => getCuentas())
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  }; */
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
                <AccordionBody
                  accordionId={(key + 1).toString()}
                ></AccordionBody>
              </AccordionItem>
            </Accordion>
          );
        })
      )}
  {/*     <Modal isOpen={modal} toggle={toggleModal} role="dialog">
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
      </Modal> */}
    </section>
  );
}