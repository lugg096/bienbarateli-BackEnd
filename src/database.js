const mongoose = require("mongoose");

const uName = 'luiggivargas';
const password = 'Vargas_2018';
const server = 'cluster0.zxplf.mongodb.net';
const db_use = 'BienBarateli';

const URI = `mongodb+srv://${uName}:${password}@${server}/${db_use}?retryWrites=true&w=majority`;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
