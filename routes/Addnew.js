var express = require("express");
var router = express.Router();
const Product = require("../models/product_models");

const AddNew_controller = require("../controller/Addnew_controller");

router.post("/addnewpost", AddNew_controller.add_newPost);

router.use("/", AddNew_controller.add_new);

module.exports = router;
