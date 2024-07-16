import buildQueryParams from "../Utils/QueryFilterPath";
import { ADD_ART, ADD_ARTLike, REMOVE_ART } from "./acionTypes"
import axios from 'axios'
export const addVenta = () => {
  return {
    type: "ADD_VENTA"
  }
}

export const add_art = (input) => {
  return async (dispatch) => {
    const { cantidad, filter, page,descuento } = input
    try {
      const { data } = await axios.get(`http://localhost:3001/tienda/articulo${buildQueryParams(filter)}`)
      if (data.totalItems === 0) { console.error("Articulo no encontrado"); }
      if (data.totalItems > 1) {
        dispatch({
          type: 'GET_ALL',
          payload: data.items
        })
      } else {
        return dispatch({
          type: ADD_ART,
          payload: {cantidad ,producto:data.items[0],descuento , page}
        })
      }
    } catch (error) {
      
    }

  }
};

export const get_artLike = (input) => {
  return async (dispatch) => {
    try {
      const { codBarras } = input

      const { data } = await axios.get(`http://localhost:3001/tienda/articulo/articuloLike/${codBarras}`)
      dispatch({
        type: ADD_ARTLike,
        payload: data
      })
    } catch (error) {
      console.error("Error al agregar el articulo ", error);
    }

  }

};
export const resetArtLike = () => {
  return {
    type: "RESET_ARTLIKE"
  }
}
export const getAll = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/tienda/articulo`)
      dispatch({
        type: 'GET_ALL',
        payload: data.items
      })

    } catch (error) {

    }

  }
};

export const setCotizacionGlobal = (cotizacion) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'SET_COTIZACION',
        payload: cotizacion
      })

    } catch (error) {

    }

  }
};
export const postCotizacionGlobal = (cotizacion) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`http://localhost:3001/tienda/cotizacion`, { cotizacionBlue: cotizacion });
      dispatch({
        type: 'SET_COTIZACION',
        payload: data
      });
    } catch (error) {
      console.error("Error al enviar la cotizacion:", error.message);
    }
  };
};


export const get_list = (input) => {
  return {
    type: "GET_LIST",
    payload: input
  }
};
export const cerrarVenta = (input) => {
  return {
    type: "CERRARVENTA",
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
export const cajaAbierta = (input) => {
  return {
    type: "CAJA_ABIERTA",
    payload: input
  }
};
export const filterArtLike = (input) => {
  return {
    type: "FILTER_ARTICULOSLIKE",
    payload: input
  }
};

export const order_articulos = (order) => {
  return {
    type: "ORDER",
    payload: order
  }
}

export const articuloActualizar = (data) => {
  return {
    type: "ART_ACTUALIZAR",
    payload: data
  }
}
export const articuloActualizarReset = (data) => {
  return {
    type: "ART_ACTUALIZAR_RESET",
    payload: data
  }
}