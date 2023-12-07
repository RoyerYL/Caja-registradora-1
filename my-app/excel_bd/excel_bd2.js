const { log } = require('console');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const xlsx = require('xlsx');
const { DataTypes } = require('sequelize');
// Configura la conexión a SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './tienda.sqlite', // Ruta deseada para el archivo SQLite,
    database:"tienda"
});

// Define tu modelo (Ajusta según tus necesidades)
const Articulo = sequelize.define('Articulo', {
    id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
     },
     name:{
        type:DataTypes.STRING,
        allowNull:false,
     },
     stock:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull:false
     },
     stockMin:{
        type:DataTypes.DECIMAL(10, 2),
        defaultValue:0.00,
     },
     costoPeso:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false,
     },
     costoDolar:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull:false,
     },
     
     iva:{
        type:DataTypes.INTEGER,
        allowNull:false,
     },
     ganancia:{
        type:DataTypes.DOUBLE,
        allowNull:false,
     },
     precioVenta:{
        type: DataTypes.DECIMAL(10, 2),
        defaultValue:0.00
     },
     ganancia_2:{
        type: DataTypes.DECIMAL(10, 2),
        defaultValue:0.00,
     },
     precioVenta_2:{
        type: DataTypes.DECIMAL(10, 2),
        defaultValue:0.00,
     },
     descripcion:{
        type:DataTypes.TEXT,
        defaultValue:"",
     },
     img:{
        type:DataTypes.STRING,
        defaultValue:"",
     },
     activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
     },
     CategoriaId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permite que la clave foránea sea nula
      },
     ProvedorId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Permite que la clave foránea sea nula
      },
  }, { timestamps: false });

   const Categoria=sequelize.define('Categoria', {
      id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true
      },
      nameCategoria:{
         type:DataTypes.STRING,
         allowNull:false,
      }
      
   }, { timestamps: false });
   const Provedor=sequelize.define('Provedor', {
      id:{
         type:DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true
      },
      razonSocial:{
         type:DataTypes.INTEGER,
         allowNull:false,
      },
      cuit:{
         type:DataTypes.INTEGER,
         defaultValue:0
      },
      nombreComercial:{
         type:DataTypes.STRING,
         allowNull:false,
      },
      direccion:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      provincia:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      telefono1:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      telefono2:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      telefono3:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      email:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      personContacto:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      comentarios:{
         type:DataTypes.STRING,
         defaultValue:""
      },
      
   }, { timestamps: false });
   
   let categoria = null
   let provedor = null
// Cargar datos desde el archivo Excel
const cargarDatosDesdeExcel = async (rutaExcel) => {
    try {
        const workbook = xlsx.readFile(rutaExcel);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        // Itera sobre las filas y agrega registros a la base de datos
        for (const row of data.slice(1)) {
            console.log(row);

        
            try {
                
                    const [newCategoria, created] = await Categoria.findOrCreate({
                        where: {
                            id: 0,
                            nameCategoria: "No tiene categoria",
                        },
                    })
                    
                    categoria = newCategoria
                
            } catch (error) {
        
                console.log("error de categoria");
            }
        
            try {
               
        
                    const [newProvedor, created] = await Provedor.findOrCreate({
                        where: {
                            // id: provedorId,
                            razonSocial: "No tiene provedor",
                            nombreComercial: "No tiene provedor",
                        },
                    })
                    provedor = newProvedor
                
            } catch (error) {
                console.log("error de provedor");
            }
              await Articulo.create({
                name: row[1], // Ajusta según las columnas de tu archivo Excel
                id: row[0], // Ajusta según las columnas de tu archivo Excel
                stock: row[2], // Ajusta según las columnas de tu archivo Excel
                costoPeso: row[3], // Ajusta según las columnas de tu archivo Excel
                costoDolar: row[4], // Ajusta según las columnas de tu archivo Excel
                iva: row[5], // Ajusta según las columnas de tu archivo Excel
                ganancia: row[6], // Ajusta según las columnas de tu archivo Excel
                precioVenta: row[7], // Ajusta según las columnas de tu archivo Excel
                CategoriaId: categoria.getDataValue('id'), // Corrige aquí
                ProvedorId: provedor.getDataValue('id')
              });
        }

        console.log('Datos cargados correctamente.');
    } catch (error) {
        console.error('Error al cargar datos desde el archivo Excel:', error);
    }
};

// Ruta al archivo Excel
const rutaExcel = path.join(__dirname, 'Articulos20231122_0932.csv');

// Sincroniza la base de datos y carga los datos desde el Excel
sequelize.sync({ alter: false }).then(async () => {
    await cargarDatosDesdeExcel(rutaExcel);
});
