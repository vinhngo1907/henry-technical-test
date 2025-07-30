const router = require("express").Router();
const transactionCtrl = require("../controllers/transaction");

router.get("/", transactionCtrl.get);
router.post("/", transactionCtrl.create);

module.exports = router;