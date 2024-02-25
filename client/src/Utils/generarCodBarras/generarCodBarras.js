const bwipjs = require('bwip-js');
const path = require('path');
const fs = require('fs');
const pictursPath = path.join(process.env.USERPROFILE, "Pictures","CodidgoBarras");
// Función para generar un código de barras y guardarlo como imagen
if (!fs.existsSync(pictursPath)) {
    fs.mkdirSync(pictursPath, { recursive: true });
}
const generateBarcode=(text)=> {
    console.log(text);
    const options = {
        bcid: 'code128',  // Tipo de código de barras, en este caso, Code 128
        text: text,       // Texto o datos que se codificarán en el código de barras
        scale: 3,         // Escala del código de barras
        height: 10,       // Altura del código de barras
        includetext: true // Incluir texto debajo del código de barras
    };

    bwipjs.toBuffer(options, (err, png) => {
        if (err) {
            console.error('Error:', err)
        }
        // Guardar el buffer de la imagen en un archivo
        const fs = require('fs');
        fs.writeFile(`${pictursPath}/${text}.png`, png, 'binary', (err) => {
            if (err) {
                return  console.error('Error:', err)
            }
            console.log('Código de barras generado y guardado como barcode.png');
            
        });
    });
}

// Llamar a la función para generar un código de barras
// generateBarcode('1234abc', (err) => {
//     if (err) {
//         console.error('Error:', err);
//     }
// });
module.exports=generateBarcode