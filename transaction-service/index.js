require("dotenv").config({ path: "./.env" });
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { clientUrl, importerUrl } = require("./utils/constants");
const app = express();
// const apiRoutes = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors({
//     // origin: ["http://localhost:5173", "http://localhost:3001"],
//     origin: [clientUrl, importerUrl],
//     credentials: true
// }));

const allowedOrigins = [clientUrl, importerUrl];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  credentials: true,
}));

app.use('/api', require('./routers'));

// request to handle undefined or all other routes
app.get('/', (req, res) => {
    res.send('App works!!!!!');
});


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Transaction Service running on port ${PORT}`));