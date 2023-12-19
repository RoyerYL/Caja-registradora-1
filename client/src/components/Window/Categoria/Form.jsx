import React, { useState } from 'react';
import style from "./Categoria.module.css"
import axios from 'axios';
export default function Form(props) {
    const [collapse, setCollapse] = useState("collapse")
    const [form, setForm] = useState({
        nameCategoria:""

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
            "nameCategoria":form.nameCategoria,
            
        }
       
        axios.post("http://localhost:3001/tienda/categoria",body).then((res)=>{
            console.log("Creado correctamente");
        })
    }
    return (
        <>

            <div className={style.containerNombreStock}>

                    <div className="form-floating mb-3">
                        <input className="form-control" name='nameCategoria' id="floatingInput" value={form.nameCategoria} onChange={handleChange} />
                        <label htmlFor="floatingInput"  >Nombre Categoria</label>
                    </div>

                <div className={style.botones}>

                    <button type="button" className="btn btn-danger" onClick={actualizarDato}>Actualizar</button>
                    <button type="button" className="btn btn-danger" onClick={addDato}>Nuevo</button>
                </div>
            </div>

        </>
    );
}

