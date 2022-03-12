const Rol = require("../models/rol");

const rolCtrl = {};

rolCtrl.getRols = async (req, res, next) => {
  const rols = await Rol.find();
  res.json(rols);
};

rolCtrl.createRol = async (req, res, next) => {
  const rol = new Rol({
    name: req.body.name,
    permissions: req.body.permissions,
    status: req.body.status
  });
  await rol.save();
  res.json({ status: "Rol created" });
};

rolCtrl.getRol = async (req, res, next) => {
  const { id } = req.params;
  const rol = await Rol.findById(id);
  res.json(rol);
};

rolCtrl.editRol = async (req, res, next) => {
  const { id } = req.params;
  await Rol.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  res.json({ status: "Rol Updated" });
};

rolCtrl.deleteRol = async (req, res, next) => {
  await Rol.findByIdAndRemove(req.params.id);
  res.json({ status: "Rol Deleted" });
};

module.exports = rolCtrl;
