import React, { useState } from 'react';
import style from "./Cliente.module.css"
import axios from 'axios';
export default function Form() {
    const [collapse, setCollapse] = useState("collapse")
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
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..
    }
    const crearCliente=()=>{
        const body = {
            "razonSocial":form.razonSocial,
            "nombre":form.nombre,
            "dni":form.dni,
            "direccion":form.direccion,
            "zona":form.zona,
            "localidad":form.localidad,
            "telefono1":form.telefono1,
            "telefono2":form.telefono2,
            "telefono3":form.telefono3,
            "email":form.email, 
            "comentarios":form.comentarios
        }
        axios.post("http://localhost:3001/tienda/cliente",body).then((res)=>{
            console.log("Creado correctamente");
        })
    }
    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }
    return (
        <div className={style.AltaArticulo}>
            <div>
                <div className={style.containerNombreStock}>

                    <div className={style.nombre}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name="razonSocial" value={form.razonSocial} onChange={handleChange} />
                            <label htmlFor="floatingInput" >Razon social</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name="nombre" value={form.nombre} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Nombre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name='dni' value={form.dni} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >CUIT/DNI</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name='direccion' value={form.direccion} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Direccon</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name='zona' value={form.zona} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Zona</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name='localidad' value={form.localidad} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Localidad</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Telefono 1 / celular 1</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Telefono 2 / celular 2</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Telefono 3 / celular 3</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput"  >Email</label>
                        </div>


                    </div>

                    <div>

                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name='descripcion' value={form.descripcion} onChange={handleChange}></textarea>
                            <label htmlFor="floatingTextarea2">Comments</label>
                        </div>
                    </div>

                    <div className={style.botones}>

                       
                        <button type="button" className="btn btn-danger" onClick={crearCliente}>Nuevo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

