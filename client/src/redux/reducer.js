import { ADD_ART, ADD_ARTlike, FILTER, GET_ART, ORDER, REMOVE_FAV } from "./acionTypes"

const initialState = {
  listProductos: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  producto: [],
  productosLike: []

}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ART:
      const { page, cantidad, producto } = payload
      const subTotal = Number(cantidad) * Number(producto.data.precioVenta)
      const newProductos = [...state.listProductos];
      newProductos[page] = [...newProductos[page], { page, cantidad, producto, subTotal }]
      return { ...state, listProductos: newProductos, producto: newProductos[page] }

    case GET_ART:
      const newProduct = state.listProductos.map((page, index) => (index === payload ? page : []));
      return { ...state, producto: newProduct[payload] || [] };
      
    case ADD_ARTlike:
      return { ...state, productosLike: [...payload] }

    default:
      return state
  }

}
