const Order = require("../models/order");
const EntryMerchandise = require("../models/entryMerchandise");

const orderCtrl = {};

orderCtrl.getOrders = async (req, res, next) => {
  let body = req.body;

  //Order By para cabeceras de tabla Fecha de envio ('dateDelivery')  y Fecha de confirmación ('dateConfirm)
  let orderBy = {};
  if (body.orderBy == 'dateDelivery') orderBy = { 'dateDelivery.tms': body.typeOrder };
  else orderBy = { dateConfirm: body.typeOrder };


  //Filter dateDelivery
  let filterDateDelivery = [{ "dateDelivery.tms": { $gte: body.dateMonth.init, $lte: body.dateMonth.end } }];
  if (body.dateDelivery_F) filterDateDelivery.push({ "dateDelivery.tms": { $gte: body.dateDelivery_I, $lte: body.dateDelivery_F } });

  /* filterDateDelivery.push({ "numShopify": ''});
 */
  let filter = {
    $and: filterDateDelivery,
    $or: [
      { name: { $regex: '.*' + (body.textFilter != null ? body.textFilter : '') + '.*', $options: 'i' } },
      { address: { $regex: '.*' + (body.textFilter != null ? body.textFilter : '') + '.*', $options: 'i' } },
      { phone: { $regex: '.*' + (body.textFilter != null ? body.textFilter : '') + '.*', $options: 'i' } },
      { district: { $regex: '.*' + (body.textFilter != null ? body.textFilter : '') + '.*', $options: 'i' } }
    ],
    status: { $in: body.statusSelect }
  };

  //Filter dateConfirm
  if (body.dateConfirm_F) filter.dateConfirm = { $gte: body.dateConfirm_I, $lte: body.dateConfirm_F };

/*   console.log('filter', filter);
  console.log('body', body);
 */
  try {
    const resOrder = await Order.find(filter).sort(orderBy);
    res.json({ valid: true, mensaje: "Listado de pedidos", res: resOrder });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al listar pedidos',
      error
    });
  }
};


orderCtrl.getOrderToday = async (req, res, next) => {
  let body = req.body;

  /*   let body = {
      "dateDelivery_I": 1641877200000,
      "dateDelivery_F": 1641963599000
    }; */
 /*  console.log('body', body); */

  try {
    const resOrder = await Order.aggregate().match({
      "dateDelivery.tms": { $gte: body.dateDelivery_I, $lte: body.dateDelivery_F }
    }).group({
      _id: '$status', count: { $sum: 1 }
    });

    res.json({ valid: true, mensaje: "Consulta de pedido", res: resOrder });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al consultar pedido',
      error
    });
  }
};

/* orderCtrl.stock = async (req, res, next) => {
  let body = req.body;

  let filter = {
    $and: [
      { "products.product._id": body.idProduct },
      { status: { $in: [1, 2] } }]
  };

  try {

    let types = body.types;
    let valor = await getMerchandise(body.idProduct);
    console.log('valor', valor);
    const resOrder = await Order.aggregate().match(filter);

    for (let index = 0; index < resOrder.length; index++) {
      let ord = resOrder[index];

      for (let t = 0; t < types.length; t++) {
        let type = types[t];
        type =

        for (let p = 0; p < ord.products.length; p++) {
          let prod = ord.products[p];
          console.log('prod',prod);
        
          if (!types[t].count) {
            types[t].count = filterOfType(valor, type._id).quantity;
            types[t].cost = filterOfType(valor, type._id).cost;
            types[t].amount = prod.amount;
            types[t].merchandise = types[t].count;
          }
          if (prod.type._id == type._id) types[t].count -= prod.quantity;

          if()


        }
      }

   
      if (index == (resOrder.length - 1)) res.json({ valid: true, mensaje: "Stock pedidos", res: types });
    }

    if (resOrder.length == 0) {
      for (let t = 0; t < types.length; t++) {
        let type = types[t];
        types[t].count = filterOfType(valor, type._id).quantity;
        types[t].cost = filterOfType(valor, type._id).cost;
        types[t].amount = 0;
        types[t].merchandise = types[t].count;
        if (t == (types.length - 1)) res.json({ valid: true, mensaje: "Stock pedidos", res: types });
      }
    }
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error en Stock pedidos',
      error
    });
  }
}; */

/*  orderCtrl.stock = async (req, res, next) => {
  let body = req.body;

  let filter = {
    $and: [
      { "products.product._id": body.idProduct },
      { status: { $in: [1, 2] } }]
  };

  try {

    let types = body.types;
    let valor = await getMerchandise(body.idProduct);
    console.log('valor', valor);
    const resOrder = await Order.aggregate().match(filter);

    for (let index = 0; index < resOrder.length; index++) {
      let ord = resOrder[index];
      for (let p = 0; p < ord.products.length; p++) {
        let prod = ord.products[p];
        console.log('prod', prod);
        for (let t = 0; t < types.length; t++) {

          let type = types[t];
          if (!types[t].count) {
            types[t].count = filterOfType(valor, type._id).quantity;
            types[t].cost = filterOfType(valor, type._id).cost;
            types[t].amount = 0;
            types[t].merchandise = types[t].count;
          }
          if (prod.type._id == type._id) {
            types[t].amount += prod.amount;
            types[t].count -= prod.quantity;
          }
        }
      }
      if (index == (resOrder.length - 1)) res.json({ valid: true, mensaje: "Stock pedidos", res: {reg:types}  });
    }

    if (resOrder.length == 0) {
      for (let t = 0; t < types.length; t++) {
        let type = types[t];
        types[t].count = filterOfType(valor, type._id).quantity;
        types[t].cost = filterOfType(valor, type._id).cost;
        types[t].amount = 0;
        types[t].merchandise = types[t].count;
        if (t == (types.length - 1)) res.json({ valid: true, mensaje: "Stock pedidos", res: {reg:types} });
      }
    }
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error en Stock pedidos',
      error
    });
  }
}; */

 orderCtrl.stock = async (req, res, next) => {
  let body = req.body;

  let filter = {
    $and: [
      { "products.product._id": body.idProduct },
      { status: { $in: [1, 2] } }]
  };

  try {

    let types = body.types;
    let types_almacen = JSON.parse(JSON.stringify(body.types ))  ;
    let valor = await getMerchandise(body.idProduct);
 /*    console.log('valor', valor); */
    const resOrder = await Order.aggregate().match(filter);

    for (let index = 0; index < resOrder.length; index++) {
      let ord = resOrder[index];
      for (let p = 0; p < ord.products.length; p++) {
        let prod = ord.products[p];
       /*  console.log('prod', prod); */
        for (let t = 0; t < types.length; t++) {

          let type = types[t];
          if (!types[t].count) {
            types[t].count = filterOfType(valor, type._id).quantity;
            types[t].cost = filterOfType(valor, type._id).cost;
            types[t].amount = 0;
            types[t].merchandise = types[t].count;
            if (ord.status == 2) {
              types_almacen[t].count = filterOfType(valor, type._id).quantity;
              types_almacen[t].cost = filterOfType(valor, type._id).cost;
              types_almacen[t].amount = 0;
              types_almacen[t].merchandise = types_almacen[t].count;
            }
          }
          if (prod.type._id == type._id) {
            types[t].amount += prod.amount;
            types[t].count -= prod.quantity;
         /*    console.log('ENTROOO'); */
            if (ord.status == 2) {
              types_almacen[t].amount += prod.amount;
              types_almacen[t].count -= prod.quantity;
        /*       console.log('types_almacen',types_almacen); */
            }
          }

        }
      }
      if (index == (resOrder.length - 1)) res.json({ valid: true, mensaje: "Stock pedidos", res: { reg: types, alm: types_almacen } });
    }

    if (resOrder.length == 0) {
      for (let t = 0; t < types.length; t++) {
        let type = types[t];
        types[t].count = filterOfType(valor, type._id).quantity;
        types[t].cost = filterOfType(valor, type._id).cost;
        types[t].amount = 0;
        types[t].merchandise = types[t].count;
     
        if (t == (types.length - 1)) res.json({ valid: true, mensaje: "Stock pedidos", res: { reg: types, alm: types } });
      }
    }
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error en Stock pedidos',
      error
    });
  }
}; 

function filterOfType(array, id) {
  let arr = array.filter(r => r._id == id);
  if (arr.length == 0) return 0;
  else return ({ quantity: arr[0].quantity, cost: arr[0].amount });
}

function getMerchandise(idProduct) {
  return new Promise(async (resolve, reject) => {

    let filter = {
      $and: [
        { product: idProduct },
        { status: { $in: [1] } }],
      status: { $ne: 3 }
    };

    const resMerch = await EntryMerchandise.aggregate()
      .match(filter)
      .group({
        _id: "$typeProduct",
        quantity: { $sum: "$quantity" },
        amount: { $sum: "$amount" }
      });
    resolve(resMerch);
  });
}

orderCtrl.createOrder = async (req, res, next) => {
  const order = new Order({

    dateConfirm: req.body.dateConfirm,
    name: req.body.name,
    address: req.body.address,
    reference: req.body.reference,
    district: req.body.district,
    phone: req.body.phone,
    numShopify: req.body.numShopify,

    products: req.body.products,
    quantity: req.body.quantity,
    amount: req.body.amount,

    payMode: req.body.payMode,
    dateDelivery: req.body.dateDelivery,
    time_initial: req.body.time_initial,
    time_end: req.body.time_end,
    obs: req.body.obs,
    labels: req.body.labels,
    status: req.body.status

  });

  try {
    const resOrder = await order.save();
    res.json({ valid: true, mensaje: "pedido creado", res: resOrder });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al crear pedido',
      error
    });
  }
};

orderCtrl.getOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resOrder = await Order.findById(id);
    res.json({ valid: true, mensaje: "Consulta de pedido", res: resOrder });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al consultar pedido',
      error
    });
  }
};

orderCtrl.editOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    var resOrder = await Order.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({
      valid: true,
      mensaje: 'Pedido actualizado',
      res: resOrder
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al actualizar pedido',
      error
    });
  }
};

orderCtrl.deleteOrder = async (req, res, next) => {
  try {
    var resOrder = await Order.findByIdAndRemove(req.params.id);
    res.json({
      valid: true,
      mensaje: 'Pedido eliminado',
      res: resOrder
    });
  } catch (error) {
    res.json({
      valid: false,
      mensaje: 'Error al eliminar pedido',
      error
    });
  }
};

module.exports = orderCtrl;
