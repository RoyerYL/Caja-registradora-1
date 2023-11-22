import { ADD_ART, FILTER, GET_ALL, ORDER, REMOVE_FAV } from "./acionTypes"

const initialState = {
  listProductos: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  producto: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ART:
      const p = state.listProductos
      p[payload.page].push(payload)
      return {...state,listProductos:p,producto:p[payload.page]}

    case GET_ALL:
      const prod = state.listProductos[payload] || [];
      return { ...state, producto: prod };


    default:
      return {
        ...state,
      };

  }

}
