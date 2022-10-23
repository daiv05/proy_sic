function ListDiario(props) {
    function handleClick() {
        props.deletion(props.iddiario)
    }
    return (
        <div className="diario">
            <h1>Codigo: {props.codigo_cuenta} </h1>
            <h1>Tipo de Cuenta: {props.tipocuenta} </h1>
            <h1>Nombre: {props.nombre_cuenta} </h1>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default ListDiario;