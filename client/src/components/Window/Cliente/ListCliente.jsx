import React, { useEffect, useState } from 'react';
import style from "./Cliente.module.css"
import axios from 'axios'
export default function ListClientes() {
    const [provedores, setProvedores] = useState([])

    useEffect(() => {
        axios("http://localhost:3001/tienda/cliente").then(({ data }) => {
            console.log(data);
            setProvedores(data)
        })
    }, [])

    return (
        <>

            <table className="table">
                <thead>
                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">Razon social</th>
                    </tr>
                </thead>
                <tbody>

                    {provedores.map((prov) => {
                        console.log(provedores);
                        return (
                                <tr key={prov.id}>
                                    <td>{prov.id}</td>

                                    <td>
                                        {/* <Link to={`/detail/${productos.id}`}> */}
                                            {prov.razonSocial}
                                        {/* </Link> */}
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

