import React, { useEffect,useState } from 'react';
import style from './ListaArticulos.module.css'
import Articulo from './Articulo';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { remove_fav } from '../../../../redux/action';
import { useParams } from 'react-router-dom';

export default function ListaArticulos(props) {

    const producto=useSelector((state)=>state.producto);
    const listProductos=useSelector((state)=>state.listProductos);

    const dispatch=useDispatch()
    const {id} = useParams()
    const [articulo,setArticulo]=useState(producto)
  
    useEffect(()=>{
        console.log(listProductos[id]);
        if(listProductos[id]){
            setArticulo(producto)
        }

    },[id,listProductos,producto])

   const onClose=(id)=>{
    dispatch(remove_fav(id))
   }

    return (
        <div className={style.listArticulo}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Código de barras</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">-</th>
                    </tr>
                </thead>
                <tbody>
                    <List onClose={onClose} producto={articulo}/>
                </tbody>

            </table>
        </div>



    )
}