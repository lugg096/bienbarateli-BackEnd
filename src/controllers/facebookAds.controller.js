const FacebookAds = require("../models/facebookAds");

const facebookCtrl = {};

facebookCtrl.list = async (req, res, next) => {
  try {
    const resFacebookAds = await FacebookAds.find();
    res.json({ valid: true, mensaje: "Listado de FacebookAds", res: resFacebookAds });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al listar FacebookAds',
      error
    });
  }
};

facebookCtrl.create = async (req, res, next) => {
  const facebook = new FacebookAds({
    product: req.body.product,
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date,
    status: req.body.status
  });

  try {
    const resFacebookAds = await facebook.save();
    res.json({ valid: true, mensaje: "FacebookAdso creado", res: resFacebookAds });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al crear FacebookAds',
      error
    });
  }
};

facebookCtrl.get = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resFacebookAds = await FacebookAds.findById(id);
    res.json({
      mensaje: "FacebookAdso consultado",
      valid: true,
      res: resFacebookAds
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al consultar FacebookAds',
      error
    });
  }
};

facebookCtrl.edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const resFacebookAds = await FacebookAds.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
      mensaje: "FacebookAdso actualizado",
      valid: true,
      res: resFacebookAds
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al actualizar FacebookAds',
      error
    });
  }
};

facebookCtrl.delete = async (req, res, next) => {
  try {
    var resFacebookAds = await FacebookAds.findByIdAndRemove(req.params.id);
    res.json({
      valid: true,
      mensaje: 'FacebookAdso eliminado',
      res: resFacebookAds
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al eliminar FacebookAds',
      error
    });
  }
};

module.exports = facebookCtrl;
