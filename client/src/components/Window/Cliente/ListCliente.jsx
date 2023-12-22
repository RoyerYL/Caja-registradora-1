import React, { useEffect, useState } from 'react';
import style from "./Cliente.module.css"
import axios from 'axios'
export default function ListClientes() {
    const [provedores, setProvedores] = useState([])

    useEffect(() => {
        axios("http://localhost:3001/tienda/cliente").then(({ data }) => {
            setProvedores(data)
        })
    }, [])

    return (
        <>

            <table className={`table  ${style.tabla}`}>
                <thead>
                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">Razon social</th>
                    </tr>
                </thead>
                <tbody>

                    {provedores.map((prov,index) => {
                        console.log(index);
                        if (index===0) {
                            return ""
                        }
                        return (
                                <tr key={prov.id}>
                                    <td>{prov.id-1}</td>
                                    <td className={style.selectClient}>
                                            {prov.razonSocial}
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

