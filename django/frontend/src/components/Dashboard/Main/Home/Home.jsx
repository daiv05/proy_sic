import React, { useContext } from "react";
import "./home.css";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SideBarContext from "../../../../context/sideBarContext";

export default function Home() {
  const { isOpen } = useContext(SideBarContext);
  const onSubmit = (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    const [fechainicio, fechafin] = [...new FormData(e.target).entries()];
    axios
      .post("/periodo/", {
        fechainicio: fechainicio[1],
        fechafin: fechafin[1],
        activo: true,
      })
      .then(() => {
        MySwal.fire({
          icon: "success",
          title: "Periodo registrado correctamente",
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
  return (
    <section
      className={isOpen ? "home-container p-4 z-index-3" : "home-container p-4"}
    >
      <h1>Welcome! </h1>
      <div className="container">
        <p>
          Período 1 :{" "}
          <span
            style={{
              color: "white",
              fontWeight: "600",
              width: "100px",
              padding: ".2rem .9rem",
              borderRadius: ".2rem",
              backgroundColor: "green",
            }}
          >
            Activo
          </span>
        </p>
        <p>Si desea finalizar el período, inicie uno nuevo</p>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Fecha Inicio
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              name="fechainicio"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Fecha Fin
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputPassword1"
              name="fechafin"
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Registrar
          </button>
        </form>
      </div>
    </section>
  );
}
