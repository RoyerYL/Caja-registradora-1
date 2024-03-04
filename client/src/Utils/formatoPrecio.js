export default function formatoPrecio(str) {
    const numero = parseFloat(str);
    if (isNaN(numero)) {
      return '0.00$';
    }
    return numero.toFixed(2) + '$';
  }