import { ADD_ART, ADD_ARTLike, GET_ART } from "./acionTypes"

const initialState = {
  listProductos: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],],
  producto: [],
  productoLike: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ART:
      const { page, cantidad, producto } = payload

      
      const newProductos = [...state.listProductos]
      newProductos[page] = [...newProductos[page], { page, cantidad, producto}]
      return { ...state, listProductos: newProductos, producto: newProductos[page] };


    case ADD_ARTLike:
      // console.log(state.productoLike);
      return { ...state, productoLike: payload };

    case 'GET_ALL':
      return { ...state, productoLike: payload };
    case 'GET_LIST':
      return { ...state, producto: state.listProductos[payload] };
    default:
      return {
        ...state,
      };

  }

}
