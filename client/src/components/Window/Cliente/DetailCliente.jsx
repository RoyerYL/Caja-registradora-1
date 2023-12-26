import React, { useState, useEffect } from 'react';
import style from "./Cliente.module.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function DetailClient() {
    const [collapse, setCollapse] = useState("collapse")
    const { id } = useParams()
    const [form, setForm] = useState({
        razonSocial: "",
        nombre: "",
        dni: 0,
        direccion: "",
        zona: "",
        localidad: "",
        telefono1: "",
        telefono2: "",
        telefono3: "",
        email: "",
        comentarios: ""

    })

    useEffect(() => {
        axios(`http://localhost:3001/tienda/cliente/${id}`)
            .then(({ data }) => {
                setForm({
                    razonSocial: data.razonSocial,
                    nombre: data.nombre,
                    dni: data.dni,
                    direccion: data.direccion,
                    zona: data.zona,
                    localidad: data.localidad,
                    telefono1: data.telefono1,
                    telefono2: data.telefono2,
                    telefono3: data.telefono3,
                    email: data.email,
                    comentarios: data.comentarios
                }
                )
            })
    }, [])

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..
    }
    const crearCliente = () => {
        const body = {
            "razonSocial": form.razonSocial,
            "nombre": form.nombre,
            "dni": form.dni,
            "direccion": form.direccion,
            "zona": form.zona,
            "localidad": form.localidad,
            "telefono1": form.telefono1,
            "telefono2": form.telefono2,
            "telefono3": form.telefono3,
            "email": form.email,
            "comentarios": form.comentarios
        }
        axios.post("http://localhost:3001/tienda/cliente", body).then((res) => {
            console.log("Creado correctamente");
        })
    }
    return (<>
        <h2 className={style.titulo}>Cliente</h2>
        <div className={style.DetailClient}>
            <div className={style.nombre}>
                <div >
                    <label>Razon social</label>
                    <input name="razonSocial" value={form.razonSocial} onChange={handleChange} />
                </div>
                <div >
                    <label>Nombre</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} />
                </div>
                <div >
                    <label>CUIT/DNI</label>
                    <input name='dni' value={form.dni} onChange={handleChange} />
                </div>
                <div >
                    <label>Direccon</label>
                    <input name='direccion' value={form.direccion} onChange={handleChange} />
                </div>
                <div >
                    <label>Zona</label>
                    <input name='zona' value={form.zona} onChange={handleChange} />
                </div>
                <div >
                    <label>Localidad</label>
                    <input name='localidad' value={form.localidad} onChange={handleChange} />
                </div>
                <div>
                    <label>Telefono 1 / celular 1</label>
                    <input value={form.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Telefono 2 / celular 2</label>
                    <input value={form.name} onChange={handleChange} />
                </div>
                <div >
                    <label>Telefono 3 / celular 3</label>
                    <input value={form.name} onChange={handleChange} />
                </div>
                <div >
                    <label>Email</label>
                    <input value={form.name} onChange={handleChange} />
                </div>


            </div>

            <div>

                <div className="flex-2">
                    <label >Comments</label>
                    <textarea placeholder="Leave a comment here" name='descripcion' value={form.descripcion} onChange={handleChange}></textarea>
                </div>
            </div>

            <div className={style.botones}>


                <button type="button" onClick={crearCliente}>Actualizar</button>
            </div>
        </div>
    </>

    );
}

