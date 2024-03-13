class index_controller {
  async update_form(req, res) {
    const Product_model = require("../models/product_models.js");
    var product_id = req.query.product_id;

    var product_detail = await Product_model.findById(product_id);

    res.render("update_form", { product_detail });
  }
  async update_post(req, res) {
    const path = require("path");
    const multer = require("multer");

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, req.body._id + ext);
      },
    });
    const upload = multer({ storage: storage });
    const Product_model = require("../models/product_models.js");

    upload.single("image")(req, res, async function (err) {
      //   console.log(req.file);
      const { _id, product_name, quantity, price, description } = req.body;
      //   console.log(req.body._id);
      if (err) {
        return res.status(500).json({ message: "Error uploading file" });
      }
      let image;
      if (req.file) {
        image = req.file.filename;
        // console.log(image);
      }

      // Cập nhật dữ liệu sản phẩm trong cơ sở dữ liệu
      try {
        await Product_model.findByIdAndUpdate(_id, {
          product_name,
          quantity,
          price,
          description,
          image: image || undefined, // Sử dụng image nếu có, nếu không thì là undefined
        });
        res.redirect("/?status=update");
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
      }
    });
  }
  async delete(req, res) {
    const Product_model = require("../models/product_models.js");
    var product_id = req.query.product_id;
    await Product_model.findByIdAndDelete(product_id);
    res.redirect("/?status=delete");
  }
  async search(req, res) {
    const Product_model = require("../models/product_models.js");

    const result = await Product_model.find({
      product_name: { $regex: new RegExp(req.query.search, "i") },
    }).exec();
    res.json(result);
  }
  async CheckID(req, res) {
    const Product_model = require("../models/product_models.js");
    var id = await Product_model.findById(req.query.id);

    if (id) {
      res.send("true");
    } else {
      res.send("false");
    }
  }
}

module.exports = new index_controller();
