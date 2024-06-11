import React from 'react';
import style from './ListaArticulos.module.css';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { add_art, order_articulos, resetArtLike } from '../../../../redux/action';

export default function ListaArticulosEncontrados(props) {
    const { productos } = props;
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleSort = (input) => {
        dispatch(order_articulos(input));
    }

    const handleClick = (id_) => {
        dispatch(resetArtLike());
        dispatch(add_art({
            cantidad: document.getElementById('cantidad').value,
            codBarras: id_,
            page: id
        }));
    }

    const resetEncontrados = () => {
        dispatch(resetArtLike());
    }

    return (
        <div className={style.listaArticulos}>
            <div className={style.header}>
                <label>codBarras</label>
                <label>nombre</label>
                <label>precio</label>
                <button onClick={resetEncontrados} className={style.closeButton}>X</button>
            </div>
            <div className={style.productList}>
                {productos.map((prod) => (
                    <div 
                        className={style.productItem}
                        onClick={() => handleClick(prod.id)} 
                        key={prod.id}
                    >
                        <p>{prod.id}</p>
                        <p>{prod.name}</p>
                        <p>${prod.precioVenta}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
