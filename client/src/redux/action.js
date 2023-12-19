import { ADD_ART, ADD_ARTLike, REMOVE_ART } from "./acionTypes"
import axios from 'axios'


export const add_art = (input) => {
  return async (dispatch) => {
    const { cantidad, codBarras, page } = input

    try {
      const { data } = await axios.get(`http://localhost:3001/tienda/articulo/${codBarras}`)

      return dispatch({
        type: ADD_ART,
        payload: {
          cantidad,
          producto:data,
          page
        }
      })
    } catch (error) {
      try {
        const {data} = await axios.get(`http://localhost:3001/tienda/articuloLike/${codBarras}`)
      return  dispatch({
          type: ADD_ARTLike,
          payload: data
        })

      } catch (error) {
        // const {data} = await axios.get(`http://localhost:3001/tienda/articulo`)
        // return dispatch({
        //   type: ADD_ARTLike,
        //   payload: data
        // })
      }
    }

  }
};

export const get_artLike = (input) => {
  return async (dispatch) => {
    try {
      const {  codBarras } = input

      const {data} = await axios.get(`http://localhost:3001/tienda/articuloLike/${codBarras}`)
      dispatch({
        type: ADD_ARTLike,
        payload: data
      })
    } catch (error) {
      console.error("Error al agregar el articulo ", error);
    }

  }

};
export const resetArtLike=()=>{
  return{
    type:"RESET_ARTLIKE"
  }
}
export const getAll = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`http://localhost:3001/tienda/articulo`)
      dispatch({
        type: 'GET_ALL',
        payload: data
      })
      
    } catch (error) {
      
    }

  }
};



export const get_list = (input) => {
  return {
    type: "GET_LIST",
    payload: input
  }
};
export const remove_art = (input) => {
  return {
    type: REMOVE_ART,
    payload: input
  }
};
export const modificar_cant = (input) => {
  return {
    type: "MODIFICAR_CANT",
    payload: input
  }
};
export const add_vendedor = (input) => {
  return {
    type: "ADD_VENDEDOR",
    payload: input
  }
};
export const add_cotizacion = (input) => {
  return {
    type: "ADD_COTIZACION",
    payload: input
  }
};

export const order_articulos = (order) => {
  return{
    type:"ORDER",
    payload:order
  }
}

export const articuloActualizar=(data)=>{
  return{
    type:"ART_ACTUALIZAR",
    payload:data
  }
}
export const articuloActualizarReset=(data)=>{
  return{
    type:"ART_ACTUALIZAR_RESET",
    payload:data
  }
}