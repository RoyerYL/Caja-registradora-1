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
        costoPeso: Number.parseFloat(0).toFixed(2),
        costoDolar: Number.parseFloat(0).toFixed(2),
        precioVenta: Number.parseFloat(0).toFixed(2),
        descripcion: "",
        iva: 0

    })


    useEffect(() => {

        axios(`http://localhost:3001/tienda/articulo/${id}`)
            .then(({ data }) => {
                if (data.name) {
                    const {
                        activo,
                        costoDolar,
                        costoPeso,
                        descripcion,
                        ganancia,
                        ganancia_2,
                        id,
                        img,
                        iva,
                        name,
                        precioVenta,
                        precioVenta_2,
                        stock,
                        stockMin, } = data

                    console.log(data);
                    setForm(data)
                }
            }).catch((err) => {

                return setForm({
                    name: "",
                    id: "",
                    stock: 0,
                    stockMin: 0,
                    costoPeso: Number.parseFloat(0).toFixed(2),
                    costoDolar: Number.parseFloat(0).toFixed(2),
                    precioVenta: Number.parseFloat(0).toFixed(2),
                    descripcion: "",
                    iva: 0,
                    ganancia: 0

                })
            })

    }, [id]);

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value });//cambio Form..
    }

    const handleClick = () => {
        console.log(form);
    }

    const [loading, setLoading] = useState(false);

    const actualizarDato = () => {
        console.log("=====");
        console.log(form.ganancia);
        console.log("=====");
        setLoading(true);
        const body={
            "activo": "0",
            "costoDolar":Number.parseFloat(form.costoDolar).toFixed(2),
            "costoPeso":  Number.parseFloat(form.costoPeso).toFixed(2),
            "descripcion":form.descripcion,
            "ganancia":form.ganancia,
            "id": form.id,
            "img": "",
            "iva": 21,
            "name": form.name,
            "stock": form.stock,
            "stockMin": form.stockMin,
            "precioVenta": form.precioVenta
        }

        axios.post("http://localhost:3001/tienda/actualizararticulo", body)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error('Error al actualizar el artículo:', error);
                // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Luego puedes utilizar el estado `loading` para mostrar un indicador de carga en tu interfaz de usuario



    return (
        <div className={style.AltaArticulo}>
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
                        <div className={style.costo}>
                            <div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Costo Peso: AR$</span>
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='costoPeso' value={form.costoPeso} onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Costo Dolar: US$</span>
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='costoDolar' value={form.costoDolar} onChange={handleChange} />
                                </div>
                            </div>
                            <div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Iva %:</span>
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='iva' value={form.iva} onChange={handleChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Ganancias %:</span>
                                    <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='ganancia' value={form.ganancia} onChange={handleChange}/>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text">precio Venta :$</span>
                                <input className="form-control" aria-label="Dollar amount (with dot and two decimal places)" name='precioVenta' value={form.precioVenta} onChange={handleChange} />
                            </div>



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


                <div>

                    <div>




                    </div>


                </div>


                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label" >Descripción:</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" resize="false" rows="3" name='descripcion' value={form.descripcion} onChange={handleChange}></textarea>
                </div>

            </div>
            <div className={style.botones}>

                <button type="button" className="btn btn-danger" onClick={actualizarDato}>Actualizar</button>
                <button type="button" className="btn btn-danger" onClick={handleClick}>Nuevo</button>
            </div>

        </div>
    );

}

export default AltaArticulo;
