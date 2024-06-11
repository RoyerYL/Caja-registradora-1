import axios from 'axios';
import React, { useState, useEffect } from 'react';
import style from './Cliente.module.css';

export default function ListCliente(props) {
    const { cliente, setClienteForm, clienteForm } = props;
    const [selectClient, setSelectClient] = useState("");

    useEffect(() => {
        if (selectClient !== "") {
            axios(`http://localhost:3001/tienda/clienteLike/${selectClient}`).then(({ data }) => {
                setClienteForm({
                    ...clienteForm,
                    nombre: data[0].nombre
                });
            });
        }
    }, [selectClient]);

    const handleClick = (e) => {
        const value = e.target.innerHTML;
        setSelectClient(value);
    };

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
                        <td className={style.selectClient} onClick={handleClick}>
                            {c.nombre}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
