import React, { useState } from 'react';
import style from "./Cliente.module.css"
export default function Cliente() {
    const [collapse, setCollapse] = useState("collapse")
    const [form, setForm] = useState({
        name: "",
        id: "",
        stock: 0,
        stockMin: 0,
        costoPeso: Number.parseFloat(0).toFixed(2),
        costoDolar: Number.parseFloat(0).toFixed(2),
        precioVenta: Number.parseFloat(0).toFixed(2),
        descripcion: "",
        iva: 0

    })
    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..
    }
    const handleClick = () => {
        collapse === "collapse" ? setCollapse("collapse.show") : setCollapse("collapse")
    }
    return (
        <div className={style.AltaArticulo}>
            <h2>Alta Articulos</h2>
            <div>
                <div className={style.containerNombreStock}>

                    <div className={style.nombre}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Razon social</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Nombre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >CUIT/DNI</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Direccon</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Zona</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Localidad</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Telefono 1 / celular 1</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Telefono 2 / celular 2</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Telefono 3 / celular 3</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} onChange={handleChange} />
                            <label htmlFor="floatingInput" name='name' >Email</label>
                        </div>


                    </div>

                    <div>

                        <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name='descripcion' value={form.descripcion} onChange={handleChange}></textarea>
                            <label htmlFor="floatingTextarea2">Comments</label>
                        </div>
                    </div>

                    <div className={style.botones}>

                        {/* <button type="button" className="btn btn-danger" onClick={actualizarDato}>Actualizar</button>
            <button type="button" className="btn btn-danger" onClick={handleClick}>Nuevo</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

