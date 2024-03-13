const { abort } = require("process");

class AddNew_controller {
  add_new(req, res) {
    var status = req.query.status;
    var id = req.query.id;
    res.render("form", { status, id });
  }

  async add_newPost(req, res) {
    const path = require("path");
    const Product_model = require("../models/product_models.js");
    var data = await Product_model.findById(req.body._id);
    if (data) {
      res.redirect("/add_new/?status=dup");
      return;
    }

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

    upload.single("image")(req, res, async function (err) {
      const Product_model = require("../models/product_models.js");
      var data = await Product_model.findById(req.body._id);
      if (data) {
        res.redirect("/add_new/?status=dup&id=" + req.body._id);
        return;
      }
      //   console.log(req.file);

      //   console.log(req.body._id);
      if (err) {
        return res.status(500).json({ message: "Error uploading file" });
      }
      let image;
      if (req.file) {
        image = req.file.filename;
        // console.log(image);
      }
      try {
        const Product_model = require("../models/product_models.js");
        if (req.body.description == "") {
          req.body.description = "Không Có";
        }
        Product_model.create(req.body);
        await Product_model.findByIdAndUpdate(req.body._id, {
          image: image || undefined, // Sử dụng image nếu có, nếu không thì là undefined
        });
        req.session.status = true;
        res.redirect("/?status=add");
      } catch (error) {
        console.log(error.log);
        res.status(500).json({ message: error.message });
      }
    });
  }
}

module.exports = new AddNew_controller();
