const fs = require("fs");
const path = require("path");
const axios = require("axios");
const XLSX = require("xlsx");
const { transactionUrl } = require("../utils/constants");

const handleUpload = async (req, res) => {
    const filePath = req.file.path;

    if (!req.headers.authorization) {
        fs.unlinkSync(filePath);
        return res.status(401).json({ error: "Missing Authorization header" });
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

        fs.unlinkSync(filePath);
        res.json({ message: "✅ File processed", total: results.length });
    } catch (error) {
        fs.unlinkSync(filePath);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { handleUpload };