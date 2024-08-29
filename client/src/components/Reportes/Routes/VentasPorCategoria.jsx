import axios from "axios";
import React, { useState, useEffect } from "react";
import style from './VentasPorCategoria.module.css';

export default function VentasPorCategoria() {
    const [ventasPorCategoria, setVentasPorCategoria] = useState([]);

    useEffect(() => {
        axios("/tienda/ticket/ticketByCategory")
            .then(({ data }) => {
                console.log(data);
                setVentasPorCategoria(data.ventas);
            })
            .catch((error) => console.error("Error fetching ventas por categoria:", error));
    }, []);

    return (
        <div className={style.VentasPorCategoria}>
            <h2>Ventas por Categoría de Producto</h2>
            <ul>
                {ventasPorCategoria.map((categoria) => (
                    <li key={categoria.CategoriaId}>
                        {categoria.Categorium?.nameCategoria
                        }: {categoria.totalVentas} unidades vendidas
                    </li>
                ))}
            </ul>
        </div>
    );
}

// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//   { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//   { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//   { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ];

// const MyLineChart = () => (
//   <LineChart width={600} height={300} data={data}>
//     <CartesianGrid strokeDasharray="3 3" />
//     <XAxis dataKey="name" />
//     <YAxis />
//     <Tooltip />
//     <Legend />
//     <Line type="monotone" dataKey="pv" stroke="#8884d8" />
//     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//   </LineChart>
// );

// export default MyLineChart;
// import React from 'react';
// import { motion } from 'framer-motion';

// const MyComponent = () => (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 1 }}
//   >
//     ¡Hola, mundo!
//   </motion.div>
// );

// export default MyComponent;
