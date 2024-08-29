import React, { useEffect, useState } from 'react';
import style from "./Provedor.module.css"
import axios from 'axios'
export default function ListProvedores() {
    const [provedores, setProvedores] = useState([])

    useEffect(() => {
        axios("/tienda/provedor").then(({ data }) => {
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

