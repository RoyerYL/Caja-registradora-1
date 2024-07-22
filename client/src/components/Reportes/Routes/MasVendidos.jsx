import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../Reportes.module.css";
import buildQueryParams from "../../../Utils/QueryFilterPath";

export default function MasVendidos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas
    const [filters, setFilter] = useState({
        name: "",
        id: "",
        page: 1,
        pageSize: 15,
        orderBy: 'cantVendidos',
        orderDirection: 'DESC'
    });

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);
            axios("http://localhost:3001/tienda/articulo" + buildQueryParams(filters))
                .then(({ data }) => {
                    console.log(data.items);
                    setProductos(data.items);
                    setTotalPages(data.totalPages); // Suponiendo que la API devuelve el número total de páginas
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                    setLoading(false);
                });
        };
        fetchData();
    }, [filters]);

    const handleNextPage = () => {
        if (filters.page < totalPages) {
            setFilter({ ...filters, page: filters.page + 1 });
        }
    };

    const handlePreviousPage = () => {
        if (filters.page > 1) {
            setFilter({ ...filters, page: filters.page - 1 });
        }
    };

    return (
        <div className={style.productListContainer}>
            {loading ? (
                <div className={style.loader}>Cargando...</div>
            ) : (
                <>
                    {productos.map((p) => (
                        <Link key={p.id} to={`/detail/${p.id}`} className={style.productLink}>
                            <div className={style.productCard}>
                                <p className={style.productName}>{p.name}</p>
                                <p className={style.productQuantity}>Cantidad Vendidos: {p.cantVendidos}</p>
                                <p className={style.productPrice}>Precio: ${p.precioVenta}</p>
                            </div>
                        </Link>
                    ))}
                    <div className={style.pagination}>
                        <button 
                            onClick={handlePreviousPage} 
                            disabled={filters.page === 1} 
                            className={style.paginationButton}
                        >
                            Anterior
                        </button>
                        <span>Página {filters.page} de {totalPages}</span>
                        <button 
                            onClick={handleNextPage} 
                            disabled={filters.page === totalPages} 
                            className={style.paginationButton}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
