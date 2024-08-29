import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from './Cliente.module.css';

export default function ListCliente(props) {
    const { cliente, setClienteForm, clienteForm } = props;
    const [selectClient, setSelectClient] = useState("");

    useEffect(() => {
        if (selectClient !== "") {
            axios(`/tienda/cliente/clienteLike/${selectClient}`).then(({ data }) => {
                console.log(data);
                setClienteForm({
                    ...clienteForm,
                    nombre: data[0].nombre
                });
            });
        }
    }, [selectClient]);



    return (
        <table className={style.tablaCliente}>
            <thead>
                <tr>
                    <th>
                        Nombre <button onClick={() => {}}>🔀</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {cliente.map((c) => (
                    <tr key={c.id}>
                        <td className={style.selectClient} value={c.nombre} onClick={()=>{setSelectClient(c.nombre)}}>
                            {c.nombre}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
