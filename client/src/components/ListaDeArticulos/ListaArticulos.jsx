import React,{useEffect,useState} from 'react';
import ListaArticulosEncontrados from '../Home/components/ListaArticulos/ListaArticulosEncontrados';
import axios from 'axios';
import style from "./ListaArticulos.module.css"

export default function ListaArticulos(props) {
    const [allProductos, setAllProductos] = useState([])
    const currentUrl = window.location.href;

    // Hacer algo con la URL
    console.log('URL actual:', currentUrl);
    
    useEffect(()=>{
       axios(`http://localhost:3001/tienda/articulo`).then(({data})=>{
        setAllProductos(data)
       })
    },[])
    return(
        <div className={style.listaArticulos}>
            <ListaArticulosEncontrados productos={allProductos}/>
        </div>
    )
    
}