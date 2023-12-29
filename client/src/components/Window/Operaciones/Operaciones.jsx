import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Vendedor from '../Vendedor/Vendedor'
import Cliente from '../Cliente/Cliente';
import Categoria from '../Categoria/Categoria';
import Provedor from '../Provedor/Provedor';

export default function Operaciones() {
    return (
        <div className='flex-2'>
            <div className={""}>

                <Link to={"operaciones/categoria"}>
                    <button>Categoria</button>
                </Link>
                <Link to={"operaciones/vendedor"}>
                    <button>Vendedor</button>
                </Link>
                <Link to={"operaciones/provedor"}>
                    <button>Provedor</button>
                </Link>
                <Link to={"operaciones/cliente"}>
                    <button>Cliente</button>
                </Link>
            </div>
            <div>

                <Routes>
                    <Route path='operaciones/categoria' element={
                        <Categoria />
                    } />
                    <Route path='operaciones/vendedor' element={
                        <Vendedor />
                    } />
                    <Route path='operaciones/provedor' element={
                        <Provedor />
                    } />
                    <Route path='operaciones/cliente' element={
                        <Cliente />
                    } />
                </Routes>
            </div>
        </div>
    )
}