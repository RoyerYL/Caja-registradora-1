import { ADD_ART, FILTER, REMOVE_FAV, ORDER, GET_ALL } from "./acionTypes"
import axios from "axios";


export const add_fav = async (input) => {

  const { cantidad, codBarras } = input

  const producto = await axios.get(`http://localhost:3001/tienda/${codBarras}`)

  const data = {
    cantidad,
    producto
  }



  return {
    type: ADD_ART,
    payload: data
  }
    ;
}

export const remove_fav = (input) => {
  return {
    type: REMOVE_FAV,
    payload: input
  }
};
export const getAll = (input) => {
  return {
    type: GET_ALL,
    payload: input
  }
};



