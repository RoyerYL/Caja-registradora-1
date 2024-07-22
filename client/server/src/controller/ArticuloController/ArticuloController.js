const { where, fn ,Op, col} = require("sequelize");
const { Articulo, Categoria, Provedor, Cliente, Vendedor } = require("../../DB_connection");

const actualizprecioPorcentaje = async (req, res) => {

    const { id, porcentajeAumento } = req.body;

    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });

        const precioActualizado = articulo.precioVenta * (1 + porcentajeAumento / 100);
        const articulo_=await Articulo.update({ precioVenta: precioActualizado }, { where: where(fn('lower', col('id')), fn('lower', id)) });

        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarActivo = async (req, res) => {

    const { articuloId, activo } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ activo: activo }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarCategoria = async (req, res) => {

    const { articuloId, categoriaId } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ CategoriaId: categoriaId }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarCostoDolar = async (req, res) => {

    const { articuloId, costoDolar } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ costoDolar: costoDolar }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarCostoPeso = async (req, res) => {

    const { articuloId, costoPeso } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ costoDolar: costoPeso }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarGanancia = async (req, res) => {

    const { articuloId, ganancia } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ ganancia: ganancia }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarIva = async (req, res) => {

    const { articuloId, iva } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ iva: iva }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarPorcentajeDolar = async (req, res) => {

    const { id, porcentajeAumento } = req.body;

    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });

        const precioActualizado = articulo.costoDolar * (1 + porcentajeAumento / 100);
        const articulo_=await Articulo.update({ costoDolar: precioActualizado }, { where: where(fn('lower', col('id')), fn('lower', id)) });

        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarPorcentajePeso = async (req, res) => {

    const { id, porcentajeAumento } = req.body;

    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });

        const precioActualizado = articulo.costoDolar * (1 + porcentajeAumento / 100);
        await Articulo.update({ costoPeso: precioActualizado }, { where: where(fn('lower', col('id')), fn('lower', id)) });


        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarPrecio = async (req, res) => {

    const { articuloId, nuevoPrecio } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ precioVenta: nuevoPrecio }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const precioEnDolares = async (req, res) => {

    const { articuloId, precioEnDolar } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ precioEnDolar:precioEnDolar }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarPrecioPorcentajexCategoria = async (req, res) => {

    const { provedorId, porcentajeAumento } = req.body;

    try {
        // Obtener los artículos con la categoryId específica
        const articulos = await Articulo.findAll({ where: { ProvedorId: provedorId } });

        if (articulos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron artículos con la categoryId proporcionada.' });
        }

        // Actualizar el precio de cada artículo con el porcentaje de aumento
        const updatePromises = articulos.map(async (articulo) => {
            const precioActualizado = articulo.costoDolar * (1 + porcentajeAumento / 100);
            await Articulo.update({ costoDolar: precioActualizado }, { where: { id: articulo.id } });
        });

        // Esperar a que todas las actualizaciones se completen
        await Promise.all(updatePromises);

        return res.status(200).json({ message: 'Precios actualizados correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarProvedor = async (req, res) => {

    const { articuloId, provedorId } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ ProvedorId: provedorId }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarStock = async (req, res) => {

    const { articuloId, stock } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ stock: stock }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const actualizarStockMin = async (req, res) => {

    const { articuloId, stockMin } = req.body;

    try {

        // Actualizar el precio del artículo
        await Articulo.update({ stockMin: stockMin }, { where: { id: articuloId } });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const addStock = async (req, res) => {

    const { id, stock } = req.body;

    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });

        const stockActualizado = articulo.stock + stock;

        // Actualizar el precio del artículo
        await Articulo.update({ stock: stockActualizado }, { where: where(fn('lower', col('id')), fn('lower', id)) });

        return res.status(200).json({ message: 'Precio actualizado correctamente.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
const articuloVendido = async (req, res) => {
    const { id, cantVendidos } = req.body;
  
    try {
      // Encuentra el artículo por su ID
      const articulo = await Articulo.findByPk(id);
  
      if (!articulo) {
        console.log(`No se encontró un artículo con el ID ${id}.`);
        return res.status(404).json({ error: `No se encontró un artículo con el ID ${id}.` });
      }
  
      // Calcula la nueva cantidad de artículos vendidos
      const cantidadTotal = Number(articulo.cantVendidos) + Number(cantVendidos);
      const stockTotal=Number(articulo.stock)-Number(cantVendidos)
      // Guarda los cambios en la base de datos
      await articulo.update({ cantVendidos: cantidadTotal,stock:stockTotal });
  
      console.log(`Se aumentó la cantidad de vendidos para el artículo con ID ${id}.`);
      res.status(200).json({ message: `Se aumentó la cantidad de vendidos para el artículo con ID ${id}.` });
  
    } catch (error) {
      console.error('Error al aumentar la cantidad de vendidos:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  

  const calcularPrecioVentaPorDolar = async (req, res) => {
    try {
        Articulo.update(
            {

                // precioVenta:2
                precioVenta: Sequelize.literal(
                    ' "costoDolar" * (SELECT "cotizacionMep" FROM "Cotizacions" LIMIT 1) *(("ganancia" + 100)/100.00) * (("iva" + 100) / 100.00)'
                ),
            },
            {
                where: { precioEnDolar: true },
            }
        )
        return res.status(201).json("Datos actualizados");

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const getAllArticulos = async (req, res) => {
    let { name, id, page = 1, pageSize = 50, orderBy = 'id', orderDirection = 'ASC' } = req.query;

    try {
        const offset = (page - 1) * pageSize;

        let where = {};

        // Construir la condición WHERE para name
        if (name) {
            const nameWords = name.split(" ").filter(word => word.length > 0);
            where.name = {
                [Op.or]: nameWords.map(word => ({
                    [Op.like]: `%${word}%`
                }))
            };
        }

        // Construir la condición WHERE para id
        if (id) {
            where.id = {
                [Op.like]: `%${id}%`
            };
        }

        // Validar orderDirection
        const validOrderDirections = ['ASC', 'DESC'];
        if (!validOrderDirections.includes(orderDirection.toUpperCase())) {
            orderDirection = 'ASC';
        }

        // // Validar orderBy
        // const validOrderFields = ['id', 'name', 'precioVenta', 'stock',"camtVendidos"];
        // if (!validOrderFields.includes(orderBy)) {
        //     orderBy = 'id';
        // }

        const { count, rows } = await Articulo.findAndCountAll({
            where,
            include: [
                {
                    model: Categoria,
                }
            ],
            limit: pageSize,
            offset,
            order: [[orderBy, orderDirection]]
        });

        const totalPages = Math.ceil(count / pageSize);

        return res.status(200).json({
            totalPages,
            currentPage: parseInt(page, 10),
            pageSize: parseInt(pageSize, 10),
            totalItems: count,
            items: rows
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getArticulo = async (req, res) => {
    const {id} = req.params
    try {
        const articulo = await Articulo.findOne({
            where: where(fn('lower', col('id')), fn('lower', id)),
        });
        if (!articulo) {
            return res.status(500).json({ error: "No encontrado"})    
        }
        return res.status(201).json(articulo);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const getArticuloByCategoria = async (req, res) => {
    const { id } = req.query
    try {
        const categoria = await Categoria.findByPk(id)
        if (!categoria) {
            return res.status(500).json({ error: "No encontrado" })
        }

        const articulo =await Articulo.findAll({
                where: { CategoriaId: categoria.id }
            })


        return res.status(201).json(articulo);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const getArticuloLike = async (req, res) => {
    const { id } = req.params
    try {
      let resultados = await Articulo.findAll({
        where: {
          id: {
            [Op.like]: `%${id}%`,
          },
        },
      });
      if (resultados.length === 0) {
        resultados = await Articulo.findAll({
          where: {
            name: {
              [Op.like]: `%${id}%`,
            },
          },
        });
      }
      return res.status(201).json(resultados);
  
    } catch (error) {
      return res.status(500).json({ error: error.message })
  
    }
  }

  const getArticulosMasVendidos = async (req, res) => {

    try {
        const allArticulos=await Articulo.findAll({
            order:[["cantVendidos","DESC"]],
            limit:50
        })

        return res.status(201).json(allArticulos);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const postArticulo = async (req, res) => {

    const {
        id,
        name,
        stock,
        stockMin,
        costoPeso,
        costoDolar,
        iva,
        ganancia,
        precioVenta,
        ganancia_2,
        precioVenta_2,
        descripcion,
        img,
        categoriaId,
        provedorId,
        precioEnDolar

    } = req.body;

    // if (!id || !name || !stock || !costoPeso || !costoDolar || !iva || !ganancia || !precioVenta) {
    //     return res.status(400).json({ error: "Faltan datos" })
    // } else { console.log("todo en orden"); }
    if (id === null) console.log("falta id");
    if (name === null) console.log("falta name");
    if (stock === null) console.log("falta stock");
    if (costoPeso === null) console.log("falta costoPeso");
    if (costoDolar === null) console.log("falta costoDolar");
    if (iva === null) console.log("falta iva");
    if (ganancia == null) console.log("falta ganancia");
    if (precioVenta === null) console.log("falta precioVenta");


    let categoria = null
    let provedor = null



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
    try {


        const [newCliente, created] = await Cliente.findOrCreate({
            where: {
                // id: provedorId,
                razonSocial: "default",
                nombre: "default",
            },
        })


    } catch (error) {
        console.log("error de cliente");
    }
    try {


        const [newVendedor, created] = await Vendedor.findOrCreate({
            where: {
                // id: provedorId,
                vendedor: "Admin",
            },
        })


    } catch (error) {
        console.log("error de cliente");
    }

    try {

        const [newUser, created] = await Articulo.findOrCreate({
            where: {
                id,
                name,
                stock,
                costoPeso,
                costoDolar,
                iva,
                ganancia,
                precioVenta,
                ProvedorId: provedor.getDataValue('id'),
                CategoriaId: categoria.getDataValue('id'),
                precioEnDolar
            },
            defaults: {
                stockMin: stockMin || 0.00,
                descripcion: descripcion || "",
                ganancia_2: ganancia_2 || 0,
                precioVenta_2: precioVenta_2 || 0.00,
                img: img || "",
            }
        })
        if (!created) { return res.status(409).json({ error: "El email ya está registrado " }) }

        const allArticulos = await Articulo.findAll()

        return res.status(201).json(allArticulos);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const updateArticulo = async (req, res) => {
    const {
        id,
        name,
        stock,
        stockMin,
        costoPeso,
        costoDolar,
        iva,
        ganancia,
        precioVenta,
        ganancia_2,
        precioVenta_2,
        descripcion,
        img,
        CategoriaId,
        ProvedorId,
        precioEnDolar

    } = req.body;



    try {
        let categoria = null
        let provedor = null
    
        try {
            const find = await Categoria.findByPk(CategoriaId)
            if (!find){
    
                const [newCategoria, created] = await Categoria.findOrCreate({
                    where: {
                        // id: categoriaId,
                        nameCategoria: "No tiene categoria",
                    },
                })
                
                categoria = newCategoria
            }
            categoria=find
        } catch (error) {
    
            console.log("error de categoria");
        }
    
        try {
            const find = await Provedor.findByPk(ProvedorId)
            if (!find) {
    
                const [newProvedor, created] = await Provedor.findOrCreate({
                    where: {
                        // id: provedorId,
                        razonSocial: "No tiene provedor",
                        nombreComercial: "No tiene provedor",
                    },
                })
                provedor = newProvedor
            } else {
                provedor = find
            }
        } catch (error) {
            console.log("error de provedor");
        }
        const updateObject = {
            id,
            name,
            stock,
            stockMin,
            costoPeso,
            costoDolar,
            iva,
            ganancia,
            precioVenta,
            ganancia_2,
            precioVenta_2,
            descripcion,
            img,
            CategoriaId:categoria.id,
            ProvedorId:provedor.id,
            precioEnDolar
        };
        if (!stockMin) {
            updateObject.stockMin = 0.00;
        }
        if (!ganancia_2) {
            updateObject.ganancia_2 = "";
        }
      
        if (!descripcion) {
            updateObject.descripcion = "";
        }

        if (!precioVenta_2) {
            updateObject.precioVenta_2 = "";
        }

        const response = await Articulo.update(
            updateObject, {

            where: {
                id
            }
        }
        )


        return res.status(201).json(response);

    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}


module.exports = {
    actualizprecioPorcentaje,
    actualizarActivo,
    actualizarCategoria,
    actualizarCostoDolar,
    actualizarCostoPeso,
    actualizarGanancia,
    actualizarIva,
    actualizarPorcentajeDolar,
    actualizarPorcentajePeso,
    actualizarPrecio,
    precioEnDolares,
    getAllArticulos,
    getArticulo,
    getArticuloByCategoria,
    getArticuloLike,
    getArticulosMasVendidos,
    postArticulo,
    updateArticulo,
    articuloVendido,
    actualizarPrecioPorcentajexCategoria,
    actualizarProvedor,
    actualizarStock,
    actualizarStockMin,
    addStock,
    calcularPrecioVentaPorDolar,
};