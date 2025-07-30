const router = require("express").Router();
const authContrl = require("../controllers/auth");

router.post("/login", authContrl.login);
router.post("/register", authContrl.regsiter);
router.post("/refresh-token", authContrl.refreshToken);
router.post("/logout", authContrl.logout);

module.exports = router;