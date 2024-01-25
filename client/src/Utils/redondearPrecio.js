export default function redondearPrecio(precio) {
    // Redondear hacia arriba al siguiente número divisible por 100
    if (precio % 100 >= 50) {
        // Redondear hacia arriba al siguiente número divisible por 100
        return Math.ceil(precio / 100) * 100;
      } else {
        // Redondear hacia abajo al número divisible por 100 más cercano
        return Math.floor(precio / 100) * 100;
      }
  
  }