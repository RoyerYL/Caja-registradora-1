import axios from 'axios'
import React, { useState, useEffect } from 'react'
import style from './Vendedor.module.css'
export default function Vendedor() {
    const [form, setForm] = useState({
        vendedor: "",
        idVendedor: 0
    })
    const [vendedores, setVendedores] = useState([])

    useEffect(() => {
        axios(`http://localhost:3001/tienda/vendedor`).then(
            ({ data }) => {
                setVendedores(data)
            }
        )
    }, [form.idVendedor])

    const handleChange = (e) => {
        const value = e.target.value
        const property = e.target.name

        setForm({ ...form, [property]: value })
    }
    const createVendedor = async () => {
        await axios.post(`http://localhost:3001/tienda/vendedor`, {
            vendedor: form.vendedor
        })
        await axios(`http://localhost:3001/tienda/vendedor`).then(
            ({ data }) => {
                setVendedores(data)
            })
        resetVendedor()

    }
    const modifyVendedor = async () => {
        await axios.post(`http://localhost:3001/tienda/updateVendedor`, {
            id: form.idVendedor,
            vendedor: form.vendedor
        })
        await axios(`http://localhost:3001/tienda/vendedor`).then(
            ({ data }) => {
                setVendedores(data)
            })
        resetVendedor()


    }
    const setVendedor = (vendedors) => {
        const { id, vendedor } = vendedors
        setForm({
            ...form,
            idVendedor: id, vendedor
        })
    }
    const deleteVendedor = async () => {
        await axios.delete(`http://localhost:3001/tienda/deleteVendedor/${form.idVendedor}`)
        await axios(`http://localhost:3001/tienda/vendedor`).then(
            ({ data }) => {
                setVendedores(data)
            })
        resetVendedor()
    }
    const resetVendedor = () => {
        setForm({
            ...form,
            idVendedor: 0,
            vendedor: ""
        })
    }
    return (
        <div className={style.Vendedores}>
            {
                vendedores.map((vendedor) => {
                    console.log(vendedor);
                    return (
                        <div key={vendedor.id} onClick={() => setVendedor(vendedor)}>
                            <p>{vendedor.vendedor}</p>
                        </div>
                    )
                })
            }
            <div className='flex-1'>

                <p>Nombre:</p>
                <input type="text" value={form.vendedor} name='vendedor' onChange={handleChange} />
            </div>
            <button onClick={createVendedor}>Crear vendedor</button>
            {form.idVendedor > 0 &&
                <>
                    <button onClick={modifyVendedor}>Actualizar</button>
                    <button onClick={deleteVendedor}>Eliminar</button>
                    <button onClick={resetVendedor}>X</button>
                </>

            }

        </div>
    )
}