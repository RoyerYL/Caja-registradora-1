import React, { useState } from 'react';
import style from "./Cliente.module.css";
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Form() {
    const [form, setForm] = useState({
        razonSocial: "",
        nombre: "",
        dni: "",
        direccion: "",
        zona: "",
        localidad: "",
        telefono1: "",
        telefono2: "",
        telefono3: "",
        email: "",
        comentarios: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }

    const validarFormulario = () => {
        if (!form.razonSocial.trim() || !form.nombre.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Validación',
                text: 'Razon Social y Nombre son campos obligatorios.',
                confirmButtonText: 'OK'
            });
            return false;
        }
        return true;
    }

    const crearCliente = () => {
        if (validarFormulario()) {
            axios.post("http://localhost:3001/tienda/cliente", form)
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Cliente creado correctamente',
                        text: `Cliente ${form.nombre} ha sido creado.`,
                        confirmButtonText: 'OK'
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo crear el cliente. Intente nuevamente.',
                        confirmButtonText: 'OK'
                    });
                });
        }
    }

    return (
        <div className={style.AltaArticulo}>
            <div className={style.containerNombreStock}>
                <div className={style.nombre}>
                    {[
                        { label: "Razon Social", name: "razonSocial" },
                        { label: "Nombre", name: "nombre" },
                        { label: "CUIT/DNI", name: "dni" },
                        { label: "Dirección", name: "direccion" },
                        { label: "Zona", name: "zona" },
                        { label: "Localidad", name: "localidad" },
                        { label: "Teléfono 1 / Celular 1", name: "telefono1" },
                        { label: "Teléfono 2 / Celular 2", name: "telefono2" },
                        { label: "Teléfono 3 / Celular 3", name: "telefono3" },
                        { label: "Email", name: "email" }
                    ].map(({ label, name }) => (
                        <div className="form-floating mb-3" key={name}>
                            <input
                                type="text"
                                className="form-control"
                                id={`floatingInput-${name}`}
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                            />
                            <label htmlFor={`floatingInput-${name}`}>{label}</label>
                        </div>
                    ))}
                    <div className="form-floating mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            name='comentarios'
                            value={form.comentarios}
                            onChange={handleChange}
                        ></textarea>
                        <label htmlFor="floatingTextarea2">Comentarios</label>
                    </div>
                </div>
                <div className={style.botones}>
                    <button type="button" className="btn btn-danger" onClick={crearCliente}>Nuevo</button>
                </div>
            </div>
        </div>
    );
}
