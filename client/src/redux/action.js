import { ADD_ART, ADD_ARTLike, REMOVE_ART} from "./acionTypes"
import axios from 'axios'


export const add_art = (input) => {
  return async (dispatch) => {
    const {cantidad, codBarras, page } = input
    if (codBarras.trim().length === 0) {
      const newProducto = await axios.get(`http://localhost:3001/tienda/articulo`)
      return dispatch({
        type: 'GET_ALL',
        payload: newProducto
      })
    }
    try {

      const producto = await axios.get(`http://localhost:3001/tienda/articulo/${codBarras}`)
      const data = {
        cantidad,
        producto,
        page
      }
      dispatch({
        type: ADD_ART,
        payload: data
      })
    } catch (error) {
      try {
        const newProducto = await axios.get(`http://localhost:3001/tienda/articuloLike/${codBarras}`)
        dispatch({
          type: ADD_ARTLike,
          payload: newProducto
        })

      } catch (error) {
        const newProducto = await axios.get(`http://localhost:3001/tienda/articulo`)
       return dispatch({
          type: ADD_ARTLike,
          payload: newProducto
        })
      }
    }

  }
};

export const get_artLike = (input) => {
  return async (dispatch) => {
    try {
      const { cantidad, codBarras, page } = input

      const newProducto = await axios.get(`http://localhost:3001/tienda/articuloLike/${codBarras}`)
      dispatch({
        type: ADD_ARTLike,
        payload: newProducto
      })
    } catch (error) {
      console.error("Error al agregar el articulo ", error);
    }

  }

};

export const getAll = async () => {
  return async (dispatch) => {
    const newProducto = await axios.get(`http://localhost:3001/tienda/articulo`)
    dispatch({
      type: 'GET_ALL',
      payload: newProducto
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



