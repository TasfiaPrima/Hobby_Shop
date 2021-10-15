const express = require("express");
const router = express.Router();
const controller = require("../controllers/products.controller.js");
const catController = require("../controllers/category.controller.js");

router.post("/products", controller.createProducts);
router.get("/products", controller.getProducts);
router.get("/products/:id", controller.getAProduct);
router.delete("/products/:id", controller.deleteProducts);
router.put("/products/:id", controller.updateProducts);



router.post("/category", catController.createCategory);
router.get("/category", catController.getCategory);
router.get("/category/:id", catController.getACategory);
router.delete("/category/:id", catController.deleteCategory);
router.put("/category/:id", catController.updateCategory);


module.exports = router;