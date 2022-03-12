const EntryMerchandise = require("../models/entryMerchandise");

const entryMerchandiseCtrl = {};

entryMerchandiseCtrl.getEntryMerchandises = async (req, res, next) => {
  const entryMerchandises = await EntryMerchandise.find();
  res.json(entryMerchandises);
};

entryMerchandiseCtrl.createEntryMerchandise = async (req, res, next) => {
  const entryMerchandise = new EntryMerchandise({
    product: req.body.product,
    typeProduct: req.body.typeProduct,
    description: req.body.description,
    typeName: req.body.typeName,
    quantity: req.body.quantity,
    amount: req.body.amount,
    supplier: req.body.supplier,
    date: req.body.date,
    status: req.body.status
  });
  await entryMerchandise.save();
  res.json({ valid: true, mensaje: "Consulta de mercaderia" });
};

entryMerchandiseCtrl.getByProduct = async (req, res, next) => {
  try {
    let filter = { product: req.body.idProduct, status: { $ne: 3 } };
    const resMerch = await EntryMerchandise
      .find(filter).sort({ date: -1 });
    /*  .populate({ path: 'product', select: 'name' }); */

    res.json({ valid: true, mensaje: "Consulta de mercaderia", res: resMerch });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al consultar mercaderia',
      error
    });
  }
};

entryMerchandiseCtrl.getEntryMerchandise = async (req, res, next) => {
  const { id } = req.params;
  const entryMerchandise = await EntryMerchandise.findById(id);
  res.json(entryMerchandise);
};

entryMerchandiseCtrl.editEntryMerchandise = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resMerc = await EntryMerchandise.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
      mensaje: "Usuario actualizado",
      valid: true,
      res: resMerc
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al actualizar usuario',
      error
    });
  }
};







entryMerchandiseCtrl.deleteEntryMerchandise = async (req, res, next) => {
  await EntryMerchandise.findByIdAndRemove(req.params.id);
  res.json({ valid: true, status: "EntryMerchandise Deleted" });
};

module.exports = entryMerchandiseCtrl;
