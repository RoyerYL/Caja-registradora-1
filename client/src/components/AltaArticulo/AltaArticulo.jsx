import React, { useState, useEffect } from 'react';
import style from './AltaArticulo.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
function AltaArticulo(props) {
    const { infoArticulo } = props

    const { id } = useParams()
    const [categoria, setCategoria] = useState([])
    const [provedor, setProvedor] = useState([])
    const [form, setForm] = useState({
        name: "",
        id: "",
        stock: 0,
        stockMin: 0,
        costoPeso: Number.parseFloat(0).toFixed(2),
        costoDolar: Number.parseFloat(0).toFixed(2),
        precioVenta: Number.parseFloat(0).toFixed(2),
        ganancia: 0,
        precioVenta_2: Number.parseFloat(0).toFixed(2),
        ganancia_2: 0,
        descripcion: "",
        iva: 21,
        img: "",
        activo: true,
        CategoriaId: 0,
        ProvedorId: 1

    })


    useEffect(() => {
        axios("http://localhost:3001/tienda/provedor").then(({ data }) => {

            setProvedor(data)
        }
        )
        axios("http://localhost:3001/tienda/categoria").then(({ data }) => {

            setCategoria(data)
        }
        )
        axios(`http://localhost:3001/tienda/articulo/${id}`)
            .then(({ data }) => {
                if (data.name) {
                    const {
                        activo,
                        costoDolar ,
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
                        stockMin,
                    } = data

                    // console.log(data);
                    setForm({
                        activo,
                        costoDolar:Number.parseFloat(costoDolar).toFixed(2) ,
                        costoPeso:Number.parseFloat(costoPeso).toFixed(2),
                        descripcion: descripcion || "",
                        ganancia,
                        ganancia_2 : ganancia_2 || 0,
                        id,
                        img,
                        iva,
                        name,
                        precioVenta:Number.parseFloat(precioVenta).toFixed(2),
                        precioVenta_2:Number.parseFloat(precioVenta_2).toFixed(2),
                        stock,
                        stockMin,
                    })
                }
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
        setLoading(true);
        const body = {
            "activo": form.activo,
            "costoDolar": Number.parseFloat(form.costoDolar).toFixed(2),
            "costoPeso": Number.parseFloat(form.costoPeso).toFixed(2),
            "descripcion": form.descripcion,
            "ganancia": form.ganancia,
            "ganancia_2": form.ganancia_2,

            "id": form.id,
            "img": "",
            "iva": 21,
            "name": form.name,
            "stock": form.stock,
            "stockMin": form.stockMin,

            "precioVenta": form.precioVenta,
            "precioVenta_2": form.precioVenta_2,

            "CategoriaId": form.CategoriaId || 0,
            "ProvedorId": Number(form.ProvedorId) || 1
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
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={form.name} name='name' onChange={handleChange} />
                            <label htmlFor="floatingInput" >Nombre articulo</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" name='id' value={form.id} onChange={handleChange} />
                            <label htmlFor="floatingInput">Codigo de barras (o codigo de articulo)</label>
                        </div>
                        {/* ****** */}
                        <div className="input-group mb-3">
                            <span className="input-group-text">Categoria</span>
                            <select className="form-select" aria-label="Default select example" value={form.CategoriaId} name='CategoriaId' onChange={handleChange}>
                                {
                                    categoria.map((cate) => {
                                        return (
                                            <option key={cate.id} value={cate.id}>{cate.nameCategoria}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Fabricante</span>
                            <select className="form-select" aria-label="Default select example" value={form.ProvedorId} name='ProvedorId' onChange={handleChange}>
                                {
                                    provedor.map((prov) => {
                                        console.log(form.ProvedorId);
                                        return (
                                            <option key={prov.id} value={prov.id}>{prov.razonSocial}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {/* ****** */}
                        <div className={style.costo}>
                            <h3>Lista de precios 1</h3>
                            <div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='costoPeso' value={`${form.costoPeso}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Costo Peso: AR$</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='costoDolar' value={`${form.costoDolar}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Costo Dolar: US$</label>
                                </div>
                            </div>
                            <div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='iva' value={` ${form.iva}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Iva %</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='ganancia' value={` ${form.ganancia}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Ganancias %</label>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" name='precioVenta' value={`${form.precioVenta}`} onChange={handleChange} />
                                <label htmlFor="floatingInput" >Precio Venta $</label>
                            </div>
                        </div>
                        <div className={style.costo}>
                            <h3>Lista de precios 2</h3>
                            <div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='costoPeso' value={`${form.costoPeso}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Costo Peso: AR$</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='costoDolar' value={`${form.costoDolar}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Costo Dolar: US$</label>
                                </div>
                            </div>
                            <div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='iva' value={` ${form.iva}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Iva %</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='ganancia_2' value={` ${form.ganancia_2}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Ganancias %</label>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" name='precioVenta_2' value={`${form.precioVenta_2}`} onChange={handleChange} />
                                <label htmlFor="floatingInput" >Precio Venta $</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={style.stock}>
                            <div>

                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='stock' value={`${form.stock}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Stock</label>
                                </div><div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" name='stockMin' value={`${form.stockMin}`} onChange={handleChange} />
                                    <label htmlFor="floatingInput" >Stock mínimo</label>
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

                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name='descripcion' value={form.descripcion} onChange={handleChange}></textarea>
                    <label htmlFor="floatingTextarea2">Comments</label>
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
