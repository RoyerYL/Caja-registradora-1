import React, { useEffect, useState } from 'react';
import style from "./Cliente.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function ListClientes() {
    const [provedores, setProvedores] = useState([])

    useEffect(() => {
        axios("http://localhost:3001/tienda/cliente").then(({ data }) => {
            setProvedores(data)
        })
    }, [])

    return (
        <>

            <table className={`${style.tabla}`}>
                <thead>
                    <tr >
                        <th >Razon social</th>
                        <th >Nombre</th>
                    </tr>
                </thead>
                <tbody>

                    {provedores.map((prov, index) => {
                        if (index === 0) {
                            return ""
                        }
                        return (
                            <tr key={prov.id}>
                                <td className={style.selectClient}>
                                <Link key={prov.id} to={`/cliente/${prov.id}`}>
                                    {prov.razonSocial}
                            </Link>
                                </td>
                                <td className={style.selectClient}>
                                    {prov.nombre}
                                </td>

                            </tr>

                        )
                    }
                    )}
                </tbody>

            </table>

        </>
    );
}

