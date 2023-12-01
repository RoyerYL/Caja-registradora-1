import React,{useEffect,useState} from 'react';
import ListaArticulosEncontrados from '../Home/components/ListaArticulos/ListaArticulosEncontrados';
import axios from 'axios';


export default function ListaArticulos(props) {
    const [allProductos, setAllProductos] = useState([])

    useEffect(()=>{
       axios(`http://localhost:3001/tienda/articulo`).then(({data})=>{
        setAllProductos(data)
       })
    },[])
    return(
        <div>
            <ListaArticulosEncontrados productos={allProductos}/>
        </div>
    )
    
}