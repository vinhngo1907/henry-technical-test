// require("dotenv").config({ path: "./.env" });
// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");
// const XLSX = require("xlsx");
// const { transactionUrl } = require("./utils/constants");

// const app = express();
// const PORT = process.env.PORT || 3000;

// const upload = multer({ dest: "uploads/" });

// app.post("/api/upload", upload.single("file"), async (req, res) => {
// 	const filePath = req.file.path;
// 	const ext = path.extname(req.file.originalname);
// 	const results = [];

// 	if (!req.headers.authorization) {
// 		fs.unlinkSync(filePath);
// 		return res.status(401).json({ error: "Missing Authorization header" });
// 	}

// 	const authHeader = req.headers.authorization;

// 	try {
// 		const workbook = XLSX.readFile(filePath);
// 		const sheetName = workbook.SheetNames[0];
// 		const sheet = workbook.Sheets[sheetName];
// 		const rows = XLSX.utils.sheet_to_json(sheet);

// 		for (const row of rows) {
// 			try {
// 				await axios.post(`${transactionUrl}/api/transactions`, row, {
// 					headers: {
// 						Authorization: authHeader,
// 					},
// 				});
// 				results.push(row);
// 			} catch (err) {
// 				console.error("❌ Error sending to transaction-service:", err.response?.data || err.message);
// 			}
// 		}

// 		fs.unlinkSync(filePath);
// 		res.json({ message: "✅ File processed", total: results.length });
// 	} catch (error) {
// 		fs.unlinkSync(filePath);
// 		res.status(500).json({ error: error.message });
// 	}
// });

// app.listen(PORT, () => console.log(`📦 Importer Service running on port ${PORT}`));

require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const { clientUrl, transactionUrl } = require("./utils/constants");

const app = express();
app.use(cors({
    origin: [clientUrl, transactionUrl],
    credentials: true
}));

const PORT = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`📦 Importer Service running on port ${PORT}`));