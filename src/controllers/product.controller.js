const Product = require("../models/product");

const productCtrl = {};

productCtrl.getProducts = async (req, res, next) => {
  try {
    const resProduct = await Product.find();
    res.json({ valid: true, mensaje: "Listado de productos", res: resProduct });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al listar producto',
      error
    });
  }
};

productCtrl.createProduct = async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    typeProduct: req.body.typeProduct,
    urlImg: req.body.urlImg,
    status: req.body.status
  });

  try {
    const resProduct = await product.save();
    res.json({ valid: true, mensaje: "Producto creado", res: resProduct });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al crear producto',
      error
    });
  }
};

productCtrl.getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resProduct = await Product.findById(id);
    res.json({
      mensaje: "Producto consultado",
      valid: true,
      res: resProduct
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al consultar producto',
      error
    });
  }
};

productCtrl.editProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const resProduct = await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
      mensaje: "Producto actualizado",
      valid: true,
      res: resProduct
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al actualizar producto',
      error
    });
  }
};

productCtrl.deleteProduct = async (req, res, next) => {
  try {
    var resProduct = await Product.findByIdAndRemove(req.params.id);
    res.json({
      valid: true,
      mensaje: 'Producto eliminado',
      res: resProduct
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al eliminar producto',
      error
    });
  }
};

module.exports = productCtrl;
