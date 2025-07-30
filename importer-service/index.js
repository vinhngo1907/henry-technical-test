require("dotenv").config({path: "./.env"})
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('fast-csv');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), async (req, res) => {
	const filePath = req.file.path;
	const results = [];

	if (!req.headers.authorization) {
		return res.status(401).json({ error: 'Missing Authorization header' });
	}

	const authHeader = req.headers.authorization;

	const stream = fs.createReadStream(filePath)
		.pipe(csv.parse({ headers: true }))
		.on('error', error => {
			fs.unlinkSync(filePath);
			res.status(500).json({ error: error.message });
		});

	for await (const row of stream) {
		try {
			await axios.post('http://localhost:3001/api/transactions', row, {
				headers: {
					Authorization: authHeader
				}
			});
			results.push(row);
		} catch (err) {
			console.error('❌ Error sending to transaction-service:', err.response?.data || err.message);
		}
	}

	fs.unlinkSync(filePath);
	res.json({ message: '✅ File processed', total: results.length });
});

app.listen(PORT, () => console.log(`📦 Importer Service running on port ${PORT}`));