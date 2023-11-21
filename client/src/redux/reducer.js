import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./acionTypes"

const initialState = {
  listProductos: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  producto: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAV:

      

      const p = state.listProductos
      p[payload.page].push(payload)
      return {...state,listProductos:p,producto:p[payload.page]}
      

    // case REMOVE_FAV:
    //   const listProductosAux = state.listProductos.filter((prod) => prod.id !== payload)
    //   console.log(listProductosAux);
    //   console.log(state.listProductos);
    //   return { ...state, listProductos: listProductosAux, };

    case "get":
      const prod = state.listProductos[payload] || [];
      return { ...state, producto: prod };


    default:
      return {
        ...state,
      };

  }

}
