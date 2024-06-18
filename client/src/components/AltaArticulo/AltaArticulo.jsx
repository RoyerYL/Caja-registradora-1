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
        ProvedorId: 1,
        precioEnDolar: false

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
        if (id) {

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
                            stockMin,
                            CategoriaId,
                            ProvedorId,
                            precioEnDolar
                        } = data

                        // console.log(data);
                        setForm({
                            activo,
                            costoDolar: Number.parseFloat(costoDolar).toFixed(2),
                            costoPeso: Number.parseFloat(costoPeso).toFixed(2),
                            descripcion: descripcion || "",
                            ganancia,
                            ganancia_2: ganancia_2 || 0,
                            id,
                            img,
                            iva,
                            name,
                            precioVenta: Number.parseFloat(precioVenta).toFixed(2),
                            precioVenta_2: Number.parseFloat(precioVenta_2).toFixed(2),
                            stock,
                            stockMin,
                            CategoriaId,
                            ProvedorId,
                            precioEnDolar
                        })
                    }
                })
        }
    }, [id]);

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        console.log(value);
        if (property === "precioEnDolar") {
            setForm({ ...form, [property]: !form.precioEnDolar });//cambio Form..
            return ""
        }
        setForm({ ...form, [property]: value });//cambio Form..
    }

    const handleClick = () => {
        if (!(form.id === "" || form.name === "")) {
            axios.post("http://localhost:3001/tienda/articulo", form)
        }
    }

    const [loading, setLoading] = useState(false);

    const actualizarDato = () => {
        setLoading(true);
        const body = {
            "activo": form.activo,
            "costoDolar": Number.parseFloat(form.costoDolar),
            "costoPeso": Number.parseFloat(form.costoPeso),
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
        axios.post("http://localhost:3001/tienda/articulo/actualizararticulo", body)
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



    const imprimirRecibo = () => {
        window.electronAPI.executeGeneratorCodBarras(form.id)
    }


    const calcular=()=>{
        const{costoDolar,costoPeso,ganancia,iva}=form
        setForm({ ...form, precioVenta: Number.parseFloat(((100+iva)/100)*((100+ganancia)/100)*costoDolar).toFixed(2) });//cambio Form..
    }

    return (
        <div className={style.AltaArticulo}>
            <h2>Alta Articulos</h2>
            <div>
                <div className={style.containerNombreStock}>

                    <div className={style.containerDatos}>
                        <div className={style.containerNombre}>
                            <div>

                                <label>Nombre articulo:</label>
                                <input value={form.name} name='name' onChange={handleChange} />
                            </div>
                            <div>

                                <label>Codigo de barras (o codigo de articulo):</label>
                                <input name='id' value={form.id} onChange={handleChange} />
                                <button onClick={imprimirRecibo}>generar cod. Barras</button>
                            </div>

                            {/* ****** */}
                            <div >
                                <label>Categoria:</label>
                                <select value={form.CategoriaId} name='CategoriaId' onChange={handleChange}>
                                    {
                                        categoria.map((cate) => {
                                            return (
                                                <option key={cate.id} value={cate.id}>{cate.nameCategoria}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Fabricante:</label>
                                <select value={form.ProvedorId} name='ProvedorId' onChange={handleChange}>
                                    {
                                        provedor.map((prov) => {
                                            return (
                                                <option key={prov.id} value={prov.id}>{prov.razonSocial}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        {/* ****** */}
                        <div className='flex-1'>
                            <div>
                                <input type="checkbox" name='precioEnDolar' checked={form.precioEnDolar} onChange={handleChange} />
                                <label>
                                    Dolar
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" name="precioEnDolar" checked={!form.precioEnDolar} onChange={handleChange} />
                                <label>
                                    Peso
                                </label>
                            </div>
                        </div>
                        <div className={style.costo}>
                            <h3>Lista de precios 1</h3>
                            <div>
                                <div>
                                    <label>Costo Peso: AR$</label>
                                    <input name='costoPeso' value={`${form.costoPeso}`} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Costo Dolar: US$</label>
                                    <input name='costoDolar' value={`${form.costoDolar}`} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Iva %</label>
                                    <input name='iva' value={`${form.iva}`} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Ganancias %</label>
                                    <input name='ganancia' value={`${form.ganancia}`} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label>Precio Venta $</label>
                                <input name='precioVenta' value={`${form.precioVenta}`} onChange={handleChange} />
                            </div>
                            <button onClick={calcular}>calcular</button>
                        </div>
                        <div className={style.costo}>
                            <h3>Lista de precios 2</h3>
                            <div>
                                <div>
                                    <label >Costo Peso: AR$</label>
                                    <input name='costoPeso' value={`${form.costoPeso}`} onChange={handleChange} />
                                </div>
                                <div>
                                    <label >Costo Dolar: US$</label>
                                    <input name='costoDolar' value={`${form.costoDolar}`} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label>Iva %</label>
                                    <input name='iva' value={` ${form.iva}`} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Ganancias %</label>
                                    <input name='ganancia_2' value={` ${form.ganancia_2}`} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <label>Precio Venta $</label>
                                <input name='precioVenta_2' value={`${form.precioVenta_2}`} onChange={handleChange} />
                            </div>
                            <button>calcular</button>
                        </div>
                    </div>

                    <div className={style.containerStock}>
                        <div className={style.stock}>
                            <div>

                                <div >
                                    <label>Stock</label>
                                    <input name='stock' value={`${form.stock}`} onChange={handleChange} />
                                </div>
                                <div >
                                    <label >Stock mínimo</label>
                                    <input name='stockMin' value={`${form.stockMin}`} onChange={handleChange} />
                                </div>

                            </div>



                        </div>
                        <div className={style.coments}>
                            <label>Comments</label>
                            <textarea name='descripcion' value={form.descripcion} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </div>


            </div>

            <div className={style.botones}>

                <button onClick={actualizarDato}>Actualizar</button>
                <button onClick={handleClick}>Nuevo</button>
            </div>
        </div>
    );

}

export default AltaArticulo;
