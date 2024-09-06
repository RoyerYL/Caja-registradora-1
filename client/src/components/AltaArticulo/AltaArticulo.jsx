import React, { useState, useEffect } from 'react';
import style from './AltaArticulo.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
function AltaArticulo(props) {
    const { infoArticulo } = props;
    const { id } = useParams();
    const cotizacion = useSelector((state) => state.cotizacionDolar)
    const [categoria, setCategoria] = useState([]);
    const [provedor, setProvedor] = useState([]);
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
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const provedorResponse = await axios("/tienda/provedores");
                setProvedor(provedorResponse.data);
                const categoriaResponse = await axios("/tienda/categoria");
                setCategoria(categoriaResponse.data);

                if (id) {
                    const articuloResponse = await axios(`/tienda/articulo/${id}`);
                    if (articuloResponse.data.name) {
                        const {
                            activo, costoDolar, costoPeso, descripcion, ganancia, ganancia_2, id,
                            img, iva, name, precioVenta, precioVenta_2, stock, stockMin,
                            CategoriaId, ProvedorId, precioEnDolar
                        } = articuloResponse.data;

                        setForm({
                            activo, costoDolar: Number.parseFloat(costoDolar).toFixed(2),
                            costoPeso: Number.parseFloat(costoPeso).toFixed(2), descripcion: descripcion || "",
                            ganancia, ganancia_2: ganancia_2 || 0, id, img, iva, name,
                            precioVenta: Number.parseFloat(precioVenta).toFixed(2),
                            precioVenta_2: Number.parseFloat(precioVenta_2).toFixed(2),
                            stock, stockMin, CategoriaId, ProvedorId, precioEnDolar
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm(prevForm => ({
            ...prevForm,
            [property]: property === "precioEnDolar" ? !prevForm.precioEnDolar : value
        }));
    };

    const handleClick = async () => {
        if (!(form.id === "" || form.name === "")) {
            try {
                await axios.post("/tienda/articulo", form);
                Swal.fire({
                    icon: 'success',
                    title: 'Artículo creado',
                    text: 'El artículo ha sido creado exitosamente'
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al crear el artículo'
                });
                console.error('Error creating article:', error);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos requeridos'
            });
        }
    };

    const [loading, setLoading] = useState(false);

    const actualizarDato = async () => {
        const confirmResult = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción actualizará los datos del artículo.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'my-popup-class',
                title: 'my-title-class',
                icon: 'my-icon-class'
            }
        });

        if (confirmResult.isConfirmed) {
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
            };
            try {
                await axios.post("/tienda/articulo/actualizararticulo", body);
                Swal.fire({
                    icon: 'success',
                    title: 'Artículo actualizado',
                    text: 'El artículo ha sido actualizado exitosamente',
                    showConfirmButton: true,
                    timer: 2000,
                    customClass: {
                        popup: 'my-popup-class',
                        title: 'my-title-class',
                        icon: 'my-icon-class'
                    }
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al actualizar el artículo',
                    showConfirmButton: true,
                    timer: 2000,
                    customClass: {
                        popup: 'my-popup-class',
                        title: 'my-title-class',
                        icon: 'my-icon-class'
                    }
                });
                console.error('Error updating article:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const generarCodBarras = () => {
        window.electronAPI.executeGeneratorCodBarras(form.id);
    };

    const calcular = () => {
        const { costoDolar, costoPeso, ganancia, iva } = form;
        setForm(prevForm => ({
            ...prevForm,
            precioVenta: Number.parseFloat((((100 + iva) / 100) * ((100 + ganancia) / 100) * costoDolar) * cotizacion).toFixed(2)
        }));
    };

    return (
        <div className={style.AltaArticulo}>
            <h2 className={style.title}>Alta Articulos</h2>
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
                                <button onClick={generarCodBarras}>Generar cod. Barras</button>
                            </div>
                            <div>
                                <label>Categoria:</label>
                                <select value={form.CategoriaId} name='CategoriaId' onChange={handleChange}>
                                    {categoria.map((cate) => (
                                        <option key={cate.id} value={cate.id}>{cate.nameCategoria}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Fabricante:</label>
                                <select value={form.ProvedorId} name='ProvedorId' onChange={handleChange}>
                                    {provedor.map((prov) => (
                                        <option key={prov.id} value={prov.id}>{prov.razonSocial}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <div>
                                <input type="checkbox" name='precioEnDolar' checked={form.precioEnDolar} onChange={handleChange} />
                                <label>Dolar</label>
                            </div>
                            <div>
                                <input type="checkbox" name="precioEnDolar" checked={!form.precioEnDolar} onChange={handleChange} />
                                <label>Peso</label>
                            </div>
                        </div>
                        <div className={style.costo}>
                            <h3>Lista de precios 1</h3>
                            <div>
                                <div>
                                    <label>Costo Peso: AR$</label>
                                    <input name='costoPeso' value={form.costoPeso} onChange={handleChange} />
                                </div>
                                <div>
                                    <label>Costo Dolar: US$</label>
                                    <input name='costoDolar' value={form.costoDolar} onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label>Ganancia %</label>
                                <input name='ganancia' value={form.ganancia} onChange={handleChange} />
                            </div>
                            <div>
                                <label>IVA %</label>
                                <input name='iva' value={form.iva} onChange={handleChange} />
                            </div>
                            <div>
                                <label>Precio de venta AR$</label>
                                <input value={form.precioVenta} onChange={handleChange} />
                                <button onClick={calcular}>Calcular</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Descripcion:</label>
                    <textarea name='descripcion' value={form.descripcion} onChange={handleChange} />
                </div>
            </div>
            <div className={style.containerButton}>
                <button className='secondary' onClick={() => window.history.back()}>Regresar</button>
                {id && (
                    <button className='primary' onClick={actualizarDato} disabled={loading}>
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                )}
                <button className='primary' onClick={handleClick} disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
            </div>
        </div>
    );
}

export default AltaArticulo;
