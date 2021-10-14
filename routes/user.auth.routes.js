const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.auth.controller.js");
//const ordercontroller = require("../controllers/orders.controller.js");

router.post("/register", controller.postRegister);
router.post("/login", controller.postLogin);
//router.get("/login", controller.getLogin);
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  router.put("/notification/:userId", controller.updateNotifications);


module.exports = router;
