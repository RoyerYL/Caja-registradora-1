import { ADD_ART, ADD_ARTLike, ADD_BUTTON, CERRAR_BUTTON, GET_ART, REMOVE_ART, REMOVE_BUTTON } from "./acionTypes"

const initialState = {
  listProductos: [],
  listLength:0,
  ventasRealizadas: [],
  producto: {},
  productoLike: [],
  allProductoLike: [],
  Vendedor: 0,
  cotizacionDolar: 0.00,
  articulosActualizar: [],
  caja: 0,
  buttons: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BUTTON:
      console.log(state.buttons);
      return {
          ...state,
          buttons: [...state.buttons, payload],
      };
  case REMOVE_BUTTON:
      return {
          ...state,
          buttons: state.buttons.filter(button => button.id !== payload),
      };
      case CERRAR_BUTTON:
        const buttonsAux = [...state.buttons]
        for (const button of buttonsAux) {
          if (button.id == payload) {
              button.open = false;
          }
        }
        return {
            ...state,
            buttons: buttonsAux
        };
    case "CERRARVENTA":
      if (state.ventasRealizadas.includes(payload)) {
        return { ...state };
      }
      const newListVentas = [...state.ventasRealizadas, payload]
      return { ...state, ventasRealizadas: newListVentas,listLength:newListVentas.length };

    case "ADD_VENTA":

      const newList = [...state.listProductos]
      newList.push({ productos: [], descuento: 0 })
      return { ...state, listProductos: newList ,listLength: newList.length};

    case ADD_ART:
      const { page, descuento, cantidad, producto } = payload

      // Clonar el array de productos
      const newProductos = [...state.listProductos]

      // Clonar el producto en la página específica
      const productoByPage = { ...newProductos[page] }

      // Actualizar el producto y el descuento
      productoByPage.productos = [...productoByPage.productos, { producto, cantidad }]
      productoByPage.descuento = descuento

      // Asignar el producto actualizado de nuevo al array de productos
      newProductos[page] = productoByPage

      // Retornar el nuevo estado con listProductos actualizado y el producto actual
      return {
        ...state,
        listProductos: newProductos,
        producto: productoByPage
      }


    case ADD_ARTLike:
      return { ...state, productoLike: payload };

    case 'GET_ALL':
      return { ...state, productoLike: payload };

    case 'GET_LIST':
      return { ...state, producto: state.listProductos[payload] };

    case "RESET_ARTLIKE":
      return { ...state, allProductoLike: [], productoLike: [] }

    case "MODIFICAR_CANT":
      const updatedListProductos = [...state.listProductos]
      const productoByPageMod = { ...updatedListProductos[payload.page.id] }

      const updatedProductos = productoByPageMod.productos.map((prod, index) => {
        if (index === payload.id) {
          let cantidadTotal = Number(prod.cantidad) + Number(payload.cant);
          if (cantidadTotal <= 0) {
            cantidadTotal = prod.cantidad;  // No permitir cantidades negativas
          }
          return {
            ...prod,
            cantidad: cantidadTotal
          };
        }
        return prod;
      });

      productoByPageMod.productos = updatedProductos;
      updatedListProductos[payload.page.id] = productoByPageMod;

      return {
        ...state,
        listProductos: updatedListProductos,
        producto: { ...productoByPageMod }
      };
    case REMOVE_ART:
      // Clonar el array de productos
      const updatedListProductosForRemove = [...state.listProductos];

      // Clonar el producto en la página específica
      const productoByPageForRemove = { ...updatedListProductosForRemove[payload.page] };

      // Filtrar el producto específico
      const updatedProductosForRemove = productoByPageForRemove.productos.filter((prod, index) => index !== payload.id);

      // Actualizar la lista de productos de la página
      productoByPageForRemove.productos = updatedProductosForRemove;

      // Asignar el producto actualizado de nuevo al array de productos
      updatedListProductosForRemove[payload.page] = productoByPageForRemove;

      return {
        ...state,
        listProductos: updatedListProductosForRemove,
        producto: productoByPageForRemove
      };

    case "ADD_VENDEDOR":
      return { ...state, Vendedor: payload }
    case "SET_COTIZACION":
      return { ...state, cotizacionDolar: payload }

    case "ADD_COTIZACION":
      return { ...state, cotizacionDolar: payload }
    case "CAJA_ABIERTA":
      return { ...state, caja: payload }
    case "ORDER":
      let orderedCharacters;

      if (payload === "A") {
        orderedCharacters = [...state.productoLike].sort((a, b) => a.id.toString().localeCompare(b.id.toString()));
      } else {
        orderedCharacters = [...state.productoLike].sort((a, b) => b.id.toString().localeCompare(a.id.toString()));
      }

      return {
        ...state,
        productoLike: orderedCharacters,
      };
    case "ART_ACTUALIZAR":
      return { ...state, articulosActualizar: [...payload] }
    case "ART_ACTUALIZAR_RESET":
      return { ...state, articulosActualizar: [] }

    case "FILTER_ARTICULOSLIKE":
      const filterArt = state.allProductoLike.filter((prod) => prod.name.toLowerCase().includes(payload))
      return { ...state, productoLike: [...filterArt] }

    default:
      return {
        ...state,
      };

  }

}
