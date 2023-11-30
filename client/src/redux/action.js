import { ADD_ART, ADD_ARTLike, REMOVE_ART } from "./acionTypes"
import axios from 'axios'


export const add_art = (input) => {
  return async (dispatch) => {
    const { cantidad, codBarras, page } = input
    if (codBarras.trim().length === 0) {
      const {data} = await axios.get(`http://localhost:3001/tienda/articulo`)
      return dispatch({
        type: 'GET_ALL',
        payload: data
      })
    }
    try {

      const { data } = await axios.get(`http://localhost:3001/tienda/articulo/${codBarras}`)

      dispatch({
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
        dispatch({
          type: ADD_ARTLike,
          payload: {data}
        })

      } catch (error) {
        const {data} = await axios.get(`http://localhost:3001/tienda/articulo`)
        return dispatch({
          type: ADD_ARTLike,
          payload: data
        })
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

export const getAll = async () => {
  return async (dispatch) => {
    const {data} = await axios.get(`http://localhost:3001/tienda/articulo`)
    dispatch({
      type: 'GET_ALL',
      payload: data
    })

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



