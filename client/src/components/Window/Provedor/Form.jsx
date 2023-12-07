import React, { useState } from 'react';
import style from "./Provedor.module.css"
import axios from 'axios';
export default function Form(props) {
    const [collapse, setCollapse] = useState("collapse")
    const [form, setForm] = useState({
        razonSocial:"",
        cuit:"",
        nombreComercial:"",
        direccion:"",
        provincia:"",
        telefono1:"",
        telefono2:"",
        telefono3:"",
        email:"",
        personContacto:"",
        comentarios:""

    })
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..
    }
    // const handleClick = () => {
    //     collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    // }

    const actualizarDato = () => { }
    const addDato = () => {
        const body = {
            "razonSocial":form.razonSocial,
            "nombreComercial":form.nombreComercial,
            "direccion":form.direccion,
            "provincia":form.provincia,
            "telefono1":form.telefono1,
            "telefono2":form.telefono2,
            "telefono3":form.telefono3,
            "email":form.email,
            "personContacto":form.personaContacto,
            "comentarios":form.comentarios
        }
        if (body.razonSocial==="" || body.nombreComercial==="") {
            throw new Error("faltan datos")
        }
        axios.post("http://localhost:3001/tienda/provedor",body).then((res)=>{
            window.location.reload()
        })
    }
    return (
        <>

            <div className={style.containerNombreStock}>

                <div className={style.nombre}>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='razonSocial' id="floatingInput" value={form.razonSocial} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Razon social</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='nombreComercial' id="floatingInput" value={form.nombreComercial} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Nombre comercial</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='cuit' id="floatingInput" value={form.cuit} onChange={handleChange} />
                        <label htmlFor="floatingInput" >CUIT</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='direccion' id="floatingInput" value={form.direccion} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Direccon</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='provincia' id="floatingInput" value={form.provincia} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Provincia</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='telefono1' id="floatingInput" value={form.telefono1} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Telefono 1</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='telefono2' id="floatingInput" value={form.telefono2} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Telefono 2</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" name='telefono3' id="floatingInput" value={form.telefono3} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Telefono 3</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="floatingInput" name='email' value={form.email} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" name='personContacto' value={form.personContacto} onChange={handleChange} />
                        <label htmlFor="floatingInput" >Persona de contacto</label>
                    </div>
                </div>

                <div>

                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name='comentarios' value={form.comentarios} onChange={handleChange}></textarea>
                        <label htmlFor="floatingTextarea2">Comments</label>
                    </div>
                </div>

                <div className={style.botones}>

                    <button type="button" className="btn btn-danger" onClick={actualizarDato}>Actualizar</button>
                    <button type="button" className="btn btn-danger" onClick={addDato}>Nuevo</button>
                </div>
            </div>

        </>
    );
}

