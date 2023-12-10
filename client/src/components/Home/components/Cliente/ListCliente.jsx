import axios from 'axios';
import React, { useState, useEffect } from 'react';
export default function ListCliente(props) {
    const { cliente,setClienteForm,clienteForm } = props
    const handleClick=()=>{
        axios("")
    }
    return (
        <>
            <table className="table">
                <thead>
                    <tr className="">
                        <th scope="col">#</th>
                        <th scope="col">Nombre <button type="button" onClick={() => {}}>🔀</button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cliente.map((c) => {
                            return (
                                
                                    <tr key={c.id}>
                                        <td>{c.id}</td>

                                        <td onClick={handleClick}>
                                            {/* <Link to={`/detail/${productos.id}`}> */}
                                                {c.razonSocial}
                                            {/* </Link> */}
                                        </td>
                                    </tr>

                                
                            )

                        })
                    }

                </tbody>
            </table >
        </>
    )
}