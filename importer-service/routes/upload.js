const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares");
const { handleUpload } = require("../controllers/upload");

router.post("/", upload.single("file"), handleUpload);

module.exports = router;