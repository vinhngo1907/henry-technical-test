const router = require("express").Router();
const transactionCtrl = require("../controllers/transaction");
const auth = require("../middleware");

router.post("/", auth, transactionCtrl.create);
router.get("/", auth, transactionCtrl.get);

module.exports = router;