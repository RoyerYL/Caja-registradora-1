import { ADD_ART, FILTER, REMOVE_FAV, ORDER, GET_ART } from "./acionTypes"
import axios from "axios";


// Importa axios y cualquier otra cosa necesaria

export const add_art = (input) => {
  return async (dispatch) => {
    try {
      const { cantidad, codBarras, page } = input;
      const producto = await axios.get(`http://localhost:3001/tienda/articulo/${codBarras}`);
      const data = {
        cantidad,
        producto,
        page
      };
      dispatch({ type: 'ADD_ART', payload: data });
    } catch (error) {
      console.error('Error al agregar artículo:', error);
    }
  };
};


export const remove_fav = (input) => {
  return {
    type: REMOVE_FAV,
    payload: input
  }
};
export const getAll = (input) => {
  return {
    type: GET_ART,
    payload: input
  }
};



