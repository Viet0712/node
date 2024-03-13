var express = require("express");
var router = express.Router();

const index_controller = require("../controller/index_controller");

/* GET home page. */
router.post("/updatepost", index_controller.update_post);
router.get("/update", index_controller.update_form);
router.get("/delete", index_controller.delete);
router.get("/search", index_controller.search);
router.get("/", async (req, res, next) => {
  var status = req.query.status;
  const Product_model = require("../models/product_models");
  var AllProduct = await Product_model.find({});

  res.render("index", { title: "Express", AllProduct, status });
});

module.exports = router;
