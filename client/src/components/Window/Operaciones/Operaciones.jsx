import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Vendedor from '../Vendedor/Vendedor'

export default function Operaciones() {
    return (
        <div>
            <div className='flex-2'>

                <Link to="operaciones/vendedor">
                    <button>Categoria</button>
                </Link>
                <Link to="operaciones/vendedor">
                    <button>Vendedor</button>
                </Link>
                <Link to="operaciones/vendedor">
                    <button>Provedor</button>
                </Link>
                <Link to="operaciones/vendedor">
                    <button>Cliente</button>
                </Link>
            </div>

            <div>
                <Routes>
                    <Route path='operaciones/vendedor' element={
                        <Vendedor />
                    } />
                </Routes>
            </div>
        </div>
    )
}