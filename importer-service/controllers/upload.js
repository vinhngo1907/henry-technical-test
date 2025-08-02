const fs = require("fs");
const path = require("path");
const axios = require("axios");
const XLSX = require("xlsx");
const { transactionUrl } = require("../utils/constants");
const MAX_FILE_SIZE = 10 * 1024; // 10KB

const handleUpload = async (req, res) => {
    const filePath = req.file.path;

    if (!req.headers.authorization) {
        // if (fs.existsSync(filePath)) {
        //     fs.unlinkSync(filePath);
        // }
        return res.status(401).json({ msg: "Missing Authorization header" });
    }

    // Check file size
    const stats = fs.statSync(filePath);
    if (stats.size > MAX_FILE_SIZE) {
        // if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(400).json({ msg: "❌ File size exceeds 10KB limit" });
    }

    const authHeader = req.headers.authorization;
    const results = [];

    try {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        for (const row of rows) {
            try {
                await axios.post(`${transactionUrl}/api/transactions`, row, {
                    headers: { Authorization: authHeader },
                });
                results.push(row);
            } catch (err) {
                console.error("Error posting to transaction-service:", err.response?.data || err.message);
            }
        }

        // if (fs.existsSync(filePath)) {
        //     fs.unlinkSync(filePath);
        // }

        res.json({ msg: "✅ File processed", total: results.length });
    } catch (error) {
        // if (fs.existsSync(filePath)) {
        //     fs.unlinkSync(filePath);
        // }
        res.status(500).json({ msg: error.message });
    }
};

module.exports = { handleUpload };