import React, { useState, useEffect } from 'react';
import style from './AltaArticulo.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
function AltaArticulo(props) {
    const { infoArticulo } = props

    const { id } = useParams()

    const [form, setForm] = useState({
        name: "",
        id: "",
        stock: 0,
        stockMin: 0,
        costoPeso: 0,
        costoDolar: 0,
        precioVenta: 0,
        descripcion: ""

    })


    useEffect(() => {

        axios(`http://localhost:3001/tienda/articulo/${id}`)
            .then(({ data }) => {
                if (data.name) {
                    console.log(data);
                    setForm(data)
                }
            }).catch((err) => { console.error(err); })

        return setForm({
            name: "",
            id: "",
            stock: 0,
            stockMin: 0,
            costoPeso: 0,
            costoDolar: 0,
            precioVenta: 0,
            descripcion: ""

        })
    }, [id]);

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..



    }
    return (
        <div className={style.Provedor}>
            <h2>Alta Articulos</h2>
            <div>
                <div className={style.containerNombreStock}>

                    <div className={style.nombre}>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Nombre :</span>
                            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='name' value={form.name} onChange={handleChange} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Codigo de barras (o codigo de articulo):</span>
                            <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='id' value={form.id} onChange={handleChange} />
                        </div>


                        <div className="input-group mb-3">
                            <span className="input-group-text">Categoria</span>
                            <select className="form-select" aria-label="Default select example" defaultValue="default">
                                <option value="default">sin categoria</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Fabricante</span>
                            <select className="form-select" aria-label="Default select example" defaultValue="default">
                                <option value="default">sin fabricante</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className={style.stock}>
                            <div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stock:</span>
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='stock' value={form.stock} onChange={handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stock minimo:</span>
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='stockMin' value={form.stockMin} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    por unidad
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    por peso
                                </label>
                            </div>


                        </div>

                    </div>
                </div>



                <div className="input-group mb-3">
                    <span className="input-group-text">precio Venta :$</span>
                    <input type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='precioVenta' value={form.precioVenta} onChange={handleChange} />
                </div>



                <div className={style.costo}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Costo Peso:</span>
                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='costoPeso' value={form.costoPeso} onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Costo Dolar:</span>
                        <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='costoDolar' value={form.costoDolar} onChange={handleChange} />
                    </div>
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label" >Descripción:</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" resize="false" rows="3" name='descripcion' value={form.descripcion} onChange={handleChange}></textarea>
                </div>

            </div>
            <div className={style.botones}>

                <button type="button" className="btn btn-danger" onClick={() => { console.log("actualizar"); }}>Actualizar</button>
                <button type="button" className="btn btn-danger" onClick={() => { console.log("nuevo"); }}>Nuevo</button>
            </div>

        </div>
    );

}

export default AltaArticulo;
