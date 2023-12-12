import React, { useEffect, useState } from 'react';
import style from './ListaArticulos.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ArticuloEncontrados from './ArticuloEncontrados';
import { order_articulos } from '../../../../redux/action';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
export default function ListaArticulosEncontrados(props) {

    const { productos } = props
    const dispatch = useDispatch()

    const handleSort = (input) => {
        dispatch(order_articulos(input))
    }

    const Row = ({ index, style }) => {
        const prod = productos[index];
        return (
            <div style={style.articulosEncontradosC}>
                <ArticuloEncontrados key={index} productos={prod} onClose={props.onClose} />
            </div>
        );
    };

    return (
        <div className={style.listArticuloEncontrados}>
            <table className="table">
                <thead>
                    <tr className={style.nomFilas}>
                        <th scope="col">Código de barras  <button type="button" onClick={() => { handleSort("A") }} >🔀</button> </th>
                        <th scope="col">Nombre <button type="button" onClick={() => { handleSort("B") }}>🔀</button></th>
                        <th scope="col">Precio </th>
                    </tr>
                </thead>
                <tbody>
                    <AutoSizer>
                        {({ height, width }) => (
                            <FixedSizeList
                                height={550} // Adjust height as needed
                                itemCount={productos.length}
                                itemSize={50} // Adjust itemSize as needed
                                width={width}
                            >
                                {Row}
                            </FixedSizeList>
                        )}
                    </AutoSizer>
                    {/* {productos.map((prod, index) => {
                        return (
                            <ArticuloEncontrados key={index} productos={prod} onClose={props.onClose} />
                        )
                    }
                    )} */}
                </tbody>
            </table>
        </div>



    )
}