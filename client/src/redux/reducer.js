import { ADD_ART, ADD_ARTLike, GET_ART, REMOVE_ART } from "./acionTypes"

const initialState = {
  listProductos: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],],
  producto: [],
  productoLike: [],
  Vendedor: "A",
  cotizacionDolar: {
    mep: 0.00,
    blue: 0.00
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ART:
      const { page, cantidad, producto } = payload


      const newProductos = [...state.listProductos]
      newProductos[page] = [...newProductos[page], { page, cantidad, producto }]
      return { ...state, listProductos: newProductos, producto: newProductos[page] };


    case ADD_ARTLike:
      console.log(payload);
      return { ...state, productoLike: payload };

    case 'GET_ALL':
      console.log(payload);
  
      return { ...state, productoLike: payload };
      
    case 'GET_LIST':
      return { ...state, producto: state.listProductos[payload] };


    case "MODIFICAR_CANT":

      console.log(state.producto);
      const newLista1 = state.producto.map((prod, index) => {
        if (index !== payload.id) {
          return "hola XD"
        }
        return prod
      })

      const newProductos3 = [...state.listProductos]
      newProductos3[payload.page] = [...newLista1]
      return { ...state, listProductos: newProductos3, producto: newLista1 };
    case REMOVE_ART:

      const newLista = state.producto.filter((prod, index) => index !== payload.id)

      const newProductos2 = [...state.listProductos]
      newProductos2[payload.page] = [...newLista]
      return { ...state, listProductos: newProductos2, producto: newLista };

    case "ADD_VENDEDOR":
      return { ...state, Vendedor: payload }

    case "ADD_COTIZACION":
      return { ...state, cotizacionDolar: payload }

    default:
      return {
        ...state,
      };

  }

}
