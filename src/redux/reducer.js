import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./acionTypes"

const initialState = {
  listProductos: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_FAV:

      return { ...state, listProductos: [...state.listProductos, payload] };

    case REMOVE_FAV:
      const listProductosAux=state.listProductos.filter((prod)=>prod.id!==payload)
      console.log(listProductosAux);
      console.log(state.listProductos);
      return { ...state, listProductos: listProductosAux,};

    default:
      return {
        ...state,
      };

  }

}
