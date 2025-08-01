const router = require("express").Router();
const authContrl = require("../controllers/auth");
const auth = require("../middleware");

router.post("/login", authContrl.login);
router.post("/register", authContrl.regsiter);
router.post("/refresh_token", authContrl.refreshToken);
router.post("/logout", auth, authContrl.logout);

module.exports = router;