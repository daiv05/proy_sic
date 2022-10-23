import { useState, useEffect } from "react"
import axios from "axios"
import ListDiario from "./ListDiario"

function LibroDiario() {
    const [diario, setNewDiario] = useState(null)
    const [formDiario, setFormDiario] = useState({
        idmayor: "",
        idcuenta: "",
        fecha_registro: "",
        concepto: "",
        cargo: "",
        monto: "",
    })

    useEffect(() => {
        getDiario()
    }, [])

    function getDiario() {
        axios({
            method: "GET",
            url: "/diario/",
        }).then((response) => {
            const data = response.data
            setNewDiario(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    function createDiario(event) {
        axios({
            method: "POST",
            url: "/diario/",
            data: {
                idmayor: formDiario.idmayor,
                idcuenta: formDiario.idcuenta,
                fecha_registro: formDiario.fecha_registro,
                concepto: formDiario.concepto,
                cargo: formDiario.cargo,
                monto: formDiario.monto,
            }
        })
            .then((response) => {
                getDiario()
            })

        setFormDiario(({
            idmayor: "",
            idcuenta: "",
            fecha_registro: "",
            concepto: "",
            cargo: "",
            monto: "",
        }))

        event.preventDefault()
    }

    function DeleteDiario(iddiario) {
        axios({
            method: "DELETE",
            url: `/diario/${iddiario}/`,
        }).then((response) => {
            getDiario()
        })
    }

    return (
        <div className="diario">
            <h1>Libro Diario</h1>
            <form onSubmit={createDiario}>
                <input type="text" placeholder="idmayor" value={formDiario.idmayor} onChange={(event) => {
                    setFormDiario({
                        ...formDiario,
                        idmayor: event.target.value
                    })
                }} />
                <input type="text" placeholder="idcuenta" value={formDiario.idcuenta} onChange={(event) => {
                    setFormDiario({
                        ...formDiario,
                        idcuenta: event.target.value
                    })
                }} />
                <input type="text" placeholder="fecha_registro" value={formDiario.fecha_registro} onChange={(event) => {
                    setFormDiario({
                        ...formDiario,
                        fecha_registro: event.target.value
                    })
                }
                } />
                <input type="text" placeholder="concepto" value={formDiario.concepto} onChange={(event) => {
                    setFormDiario({
                        ...formDiario,
                        concepto: event.target.value
                    })
                }
                } />
                <input type="text" placeholder="cargo" value={formDiario.cargo} onChange={(event) => {
                    setFormDiario({
                        ...formDiario,
                        cargo: event.target.value
                    })
                }
                } />
                <input type="text" placeholder="monto" value={formDiario.monto} onChange={(event) => {
                    setFormDiario({
                        ...formDiario,
                        monto: event.target.value
                    })
                }
                } />
                <button type="submit">Create</button>
            </form>

            {diario && diario.map((diario) => {
                return <ListDiario 
                iddiario={diario.iddiario} 
                idmayor={diario.idmayor} 
                idcuenta={diario.idcuenta} 
                fecha_registro={diario.fecha_registro} 
                concepto={diario.concepto} 
                cargo={diario.cargo} 
                monto={diario.monto} 
                deletion={DeleteDiario} />
            })}
        </div>
    )
}

export default LibroDiario;