import React, { useEffect, useState } from 'react';
import style from "./Login.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { add_vendedor, setCotizacionGlobal } from '../../redux/action';
import axios from 'axios';
import Caja from './Caja/Caja';

export default function Login(props) {
    const { Cotizacion, setCotizacion } = props;
    const [isCajaAbierta, setIsCajaAbierta] = useState(false);
    const dispatch = useDispatch();
    const Vendedor = useSelector((state) => state.Vendedor);
    const caja = useSelector((state) => state.caja);
    const [cajaAbierta_, setCajaAbierta] = useState(0);
    const [vendedores, setVendedores] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        const fetchCotizacionData = async () => {
            try {
                const { data } = await axios.get("/tienda/cotizacion");
                if (data.length > 0) {
                    const { cotizacionBlue } = data[0];

                    dispatch(setCotizacionGlobal(cotizacionBlue));

                    setCotizacion(prevCotizacion => ({
                        ...prevCotizacion,
                        cotizacionBlue: data[0].cotizacionBlue,
                        cotizacionMep: data[0].cotizacionMep,
                    }));
                }
            } catch (error) {
                console.error("Error fetching cotizacion data:", error);
            }
        };

        fetchCotizacionData();
    }, [cajaAbierta_, dispatch, setCotizacion]);

    useEffect(() => {
        setIsCajaAbierta(Cotizacion.apertura)

        const fetchVendedores = async () => {
            try {
                const { data } = await axios.get("/tienda/vendedor");
                dispatch(add_vendedor(data[0].id));
                setVendedores(data);
            } catch (error) {
                console.error("Error fetching vendedores data:", error);
            }
        };

        fetchVendedores();
    }, [dispatch]);

    const validateForm = () => {
        const newErrors = {};
        console.log(Cotizacion.precioInicial);

        // Verifica si el precioInicial es un número válido
        if (!Cotizacion.apertura && (Cotizacion.precioInicial === "" || isNaN(Number(Cotizacion.precioInicial)))) {
            newErrors.precioInicial = 'Precio Inicial is required and must be a valid number.';
        }

        // Verifica si el precioFinal es un número válido
        if (Cotizacion.apertura && (Cotizacion.precioFinal === "" || isNaN(Number(Cotizacion.precioFinal)))) {
            newErrors.precioFinal = 'Precio Final is required and must be a valid number.';
        }

        // Verifica si la cotización Blue es un número válido
        if (Cotizacion.cotizacionBlue === "" || isNaN(Number(Cotizacion.cotizacionBlue))) {
            newErrors.cotizacionBlue = 'Cotizacion Blue is required and must be a valid number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async (event) => {
        event.preventDefault(); // Prevent page reload
        console.log("submit");

        if (!validateForm()) {
            console.log("hola");

            return;
        }
        try {
            const { data } = await axios.post("/tienda/cotizacion", { cotizacionBlue: Cotizacion.cotizacionBlue });
            const { cotizacionBlue } = data[0];
            dispatch(setCotizacionGlobal(cotizacionBlue));
        } catch (error) {
            console.error("Error updating cotizacion:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "vendedor") {
            dispatch(add_vendedor(value));
        } else {
            setCotizacion({ ...Cotizacion, [name]: value });
        }
    };

    const validateAperturaForm = () => {
        const newErrors = {};

        if (isNaN(Cotizacion.precioInicial)) {
            newErrors.precioInicial = 'Precio Inicial is required and must be a number.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateCotizacionForm = () => {
        const newErrors = {};
        if (!Cotizacion.cotizacionBlue || isNaN(Cotizacion.cotizacionBlue)) {
            newErrors.cotizacionBlue = 'Cotizacion Blue is required and must be a number.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const botonCaja = () => {
        if (!isCajaAbierta) {
            console.log("apertura");
            
            apertura()
        } else {
            console.log("cierre");
            
            cierre()
        }
    }
    const apertura = async () => {
        if (!validateAperturaForm()) {
            return;
        }
        try {
            await axios.post("/tienda/caja", {
                precioInicial: Cotizacion.precioInicial,
                fechaApertura: new Date()
            });
            setIsCajaAbierta(true);
            setCajaAbierta(1);
            setCotizacion({ ...Cotizacion, apertura: true });
        } catch (error) {
            console.error("Error opening caja:", error);
        }
    };



    const cierre = async () => {
        if (!validateAperturaForm()) {
        } else {

            try {
                console.log("cerrando...");
                console.log(caja);
                
                await axios.put("/tienda/caja/cerrar", {
                    id: caja,
                    precioFinal: Cotizacion.precioFinal,
                    fechaCierre: new Date(),
                });
                setIsCajaAbierta(false);
                setCajaAbierta(2);
                setCotizacion({ ...Cotizacion, apertura: false });
            } catch (error) {
                console.error("Error closing caja:", error);
            }
        }
    };

    const actualizarPrecios = async () => {
        try {
            await axios.post("/tienda/articulo/calcularPrecioVentaPorDolar");
        } catch (error) {
            console.error("Error updating precios:", error);
        }
    };

    return (
        <div className={style.login}>
            <div className={style.cajaApertura}>
                {isCajaAbierta ? (
                    <>
                        <span>Caja abierta</span>
                        <div className={style.precioInicial}>
                            <label>Precio Inicial: </label>
                            <label>{Cotizacion.precioInicial}</label>
                            <label> $</label>
                        </div>
                        <div>
                            <label>Precio Final: </label>
                            <input name='precioFinal' value={Cotizacion.precioFinal} onChange={handleChange} />
                            <label> $</label>
                            {errors.precioFinal && <span className={style.error}>{errors.precioFinal}</span>}
                        </div>
                        <div>
                            <p onClick={botonCaja}>Cerrar caja</p>
                        </div>
                    </>
                ) : (
                    <>
                        <label>Precio Inicial</label>
                        <input name='precioInicial' value={Cotizacion.precioInicial} onChange={handleChange} />
                        <div>
                            <p onClick={botonCaja}>Apertura</p>
                        </div>
                        {errors.precioInicial && <span className={style.error}>{errors.precioInicial}</span>}
                    </>
                )}
            </div>
            <div className={style.Cotizacion}>
                <div>
                    <label htmlFor="vendedor">Vendedor: </label>
                    <select id='vendedor' value={Vendedor} name='vendedor' onChange={handleChange}>
                        {vendedores.map((vendedor) => (
                            <option key={vendedor.id} value={vendedor.id}>{vendedor.vendedor}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Cotizacion dolar: </label>
                    <input name='cotizacionBlue' value={Cotizacion.cotizacionBlue} onClick={(event) => { event.target.value = "" }} onChange={handleChange} />
                    <label> $</label>
                    {errors.cotizacionBlue && <span className={style.error}>{errors.cotizacionBlue}</span>}
                </div>
                <div className={style.botonCotizacion}>
                    <button onClick={submitHandler}>Actualizar precios</button>
                </div>
            </div>
            <Caja cajaAbierta={cajaAbierta_} />
        </div>
    );
}
