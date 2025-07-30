require("dotenv").config({ path: "./.env" });
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
// const apiRoutes = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api', require('./routers'));

// request to handle undefined or all other routes
app.get('/', (req, res) => {
    res.send('App works!!!!!');
});


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Transaction Service running on port ${PORT}`));