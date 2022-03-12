const User = require("../models/user");
var bcrypt = require('bcryptjs');
const userCtrl = {};

userCtrl.getUsers = async (req, res, next) => {
  try {
    const resUser = await User.find();
    res.json({ valid: true, mensaje: "Listado de usuarios", res: resUser });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al listar usuario',
      error
    });
  }
};

userCtrl.createUser = async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    userName: req.body.userName,
    pass: bcrypt.hashSync(req.body.pass, 10),
    role: req.body.role,
    status: req.body.status
  });

  try {
    const resUser = await user.save();
    res.json({ valid: true, mensaje: "Usuario creado", res: resUser });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al crear usuario',
      error
    });
  }

};

userCtrl.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resUser = await User.findById(id);
    res.json({
      mensaje: "Usuario encontrado",
      valid: true,
      res: resUser
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al actualizar usuario',
      error
    });
  }
};

userCtrl.editUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
      mensaje: "Usuario actualizado",
      valid: true,
      res: resUser
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al actualizar usuario',
      error
    });
  }
};

userCtrl.deleteUser = async (req, res, next) => {
  try {
    var resUser = await User.findByIdAndDelete(req.params.id);
    res.json({
      valid: true,
      mensaje: 'Usuario eliminado',
      res: resUser
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al eliminar usuario',
      error
    });
  }
};

userCtrl.LoginUser = async (req, res, next) => {
  var body = req.body;

  try {
    const resUser = await User.findOne({ userName: body.userName });
    if (!resUser) {
      res.json({
        valid: false,
        mensaje: 'Credenciales incorrectas - username'
      });
    }

    if (!bcrypt.compareSync(body.pass, resUser.pass)) {
      return res.json({
        ok: false,
        mensaje: 'Credenciales incorrectas - password'
      });
    }

    res.json({
      valid: true,
      res: resUser
    });

  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al buscar usuario',
      error
    });
  }

};




/* app.post('/', (req, res) => {
  var body = req.body;

  Usuario.findOne({ username: body.username }, (err, usuarioDB) => {

      if (err) {
          return res.status(500).json({
              ok: false,
              mensaje: 'Error al buscar usuario',
              errors: err
          });
      }

      if (!usuarioDB) {
          return res.json({
              ok: false,
              mensaje: 'Credenciales incorrectas - username',
              errors: err
          });
      }

      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
          return res.json({
              ok: false,
              mensaje: 'Credenciales incorrectas - password',
              errors: err
          });
      }

      // Crear un token!!!
      usuarioDB.password = ':)';

      var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

      res.status(200).json({
          ok: true,
          usuario: usuarioDB,
          token: token
      });

  })
}); */

module.exports = userCtrl;
