import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DetailCliente from './DetailCLiente';
import { Link } from 'react-router-dom';

export default function ListClient() {
  const [clientes, setClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    axios.get('/tienda/cliente').then(({ data }) => {
      setClientes(data);
      console.log(data);
    });
  }, []);

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
  };

  return (
    <div>
      <h1>Lista de clientes</h1>
      <input type="text" name="" id="" />
      <span>Buscar</span>
      {clientes.map((client) => {
        return (
          <div key={client.id}>
            <span>Nombre: </span>
            <input type="text" value={client.nombre} readOnly />

            <span>Razón social: </span>
            <input type="text" value={client.razonSocial} readOnly />

            <span>DNI: </span>
            <input type="text" value={client.dni} readOnly />

            <span>Dirección: </span>
            <input type="text" value={client.direccion} readOnly />

            <Link to="clientes/detail" onClick={() => handleSelectCliente(client)}>
              <span>Ver</span>
            </Link>
          </div>
        );
      })}
      {/* Pasar el cliente seleccionado a DetailCliente */}
      {selectedCliente && <DetailCliente cliente={selectedCliente} />}
    </div>
  );
}
