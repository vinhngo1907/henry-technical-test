const express = require("express");

const apiRouter = express();
const uploadRoutes = require("./upload");

apiRouter.use('/upload', uploadRoutes);

module.exports =  apiRouter;