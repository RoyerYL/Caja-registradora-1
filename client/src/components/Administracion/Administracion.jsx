import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Administracion(props) {

    const [form,setForm]=useState({
        name:"",
        direccion:""
    })
  
    const handleChangue = (event) => {
        const property = event.target.name
        const value = event.target.value

        setForm({ ...form, [property]: value })
    }

    return (
        <div>
            hola
            <input type="text"  onChange={handleChangue} name='name' value={form.name}/>
        </div>
    )
}