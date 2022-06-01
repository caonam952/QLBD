require('dotenv').config();
const express = require("express");
const app = express();

const cors=require("cors");
app.use(cors({ allowedHeaders: '*' }));


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


const {isAuth} = require('./app/common/middleWare')
require("./app/routers/home.router")(app);
require("./app/routers/auth.router")(app);
app.use(isAuth)
require("./app/routers/thanhVien.router")(app);
require("./app/routers/bangDia.router")(app);
require("./app/routers/chiTietPhieuThue.router")(app);
require("./app/routers/phieuThue.router")(app);
require("./app/routers/theLoai.router")(app);
require("./app/routers/nhaSX.router")(app);

app.listen(3001, function () {
  console.log("server listening on port 3001");
});
