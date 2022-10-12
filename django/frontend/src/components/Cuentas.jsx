import { useState, useEffect } from "react"
import axios from "axios"
import List from "./List"

function Cuenta() {
      const [cuentas, setNewCuentas] = useState(null)
      const [formCuenta, setFormCuenta] = useState({
            codigo_cuenta: "",
            tipocuenta: "",
            nombre_cuenta: ""
      })

      useEffect(() => {
            getCuentas()
      }, [])

      function getCuentas() {
            axios({
                  method: "GET",
                  url: "/cuentas/",
            }).then((response) => {
                  const data = response.data
                  setNewCuentas(data)
            }).catch((error) => {
                  if (error.response) {
                        console.log(error.response);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                  }
            })
      }

      function createCuenta(event) {
            axios({
                  method: "POST",
                  url: "/cuentas/",
                  data: {
                        codigo_cuenta: formCuenta.codigo_cuenta,
                        tipocuenta: formCuenta.tipocuenta,
                        nombre_cuenta: formCuenta.nombre_cuenta
                  }
            })
                  .then((response) => {
                        getCuentas()
                  })

            setFormCuenta(({
                  codigo_cuenta: "",
                  tipocuenta: "",
                  nombre_cuenta: ""
            }))

            event.preventDefault()
      }


      function DeleteCuenta(idcuenta) {
            axios({
                  method: "DELETE",
                  url: `/cuentas/${idcuenta}/`,
            })
                  .then((response) => {
                        getCuentas()
                  });
      }

      function handleChange(event) {
            const { value, name } = event.target
            setFormCuenta(prevCuenta => ({
                  ...prevCuenta, [name]: value
            })
            )
      }

      return (
            <div className=''>

                  <form className="create-cuenta">
                        <input onChange={handleChange} text={formCuenta.codigo_cuenta} name="codigo_cuenta" placeholder="Codigo" value={formCuenta.codigo_cuenta}/>
                        <input onChange={handleChange} text={formCuenta.tipocuenta} name="tipocuenta" placeholder="Tipo" value={formCuenta.tipocuenta}/>
                        <input onChange={handleChange} text={formCuenta.nombre_cuenta} name="nombre_cuenta" placeholder="Nombre" value={formCuenta.nombre_cuenta}/>
                        <button onClick={createCuenta}>Create Cuenta</button>
                  </form>

                  {cuentas && cuentas.map(cuenta => <List
                        key={cuenta.idcuenta}
                        idcuenta={cuenta.idcuenta}
                        codigo_cuenta={cuenta.codigo_cuenta}
                        tipocuenta={cuenta.tipocuenta}
                        nombre_cuenta={cuenta.nombre_cuenta}
                        deletion={DeleteCuenta}
                  />
                  )}
            </div>
      );
}

export default Cuenta;
