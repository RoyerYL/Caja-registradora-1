import { ADD_FAV, FILTER, REMOVE_FAV,ORDER } from "./acionTypes"



export const add_fav = (input) => {
  return{
    type:ADD_FAV,
    payload:input
  }
};

export const remove_fav = (input) => {
  return{
    type:REMOVE_FAV,
    payload:input
  }
};



