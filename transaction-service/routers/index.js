const express = require("express");

const apiRouter = express();
const authRoutes = require("./auth");
const transactionRoutes = require("./transaction");

apiRouter.use('/auth', authRoutes);
apiRouter.use('/transaction', transactionRoutes);

module.exports =  apiRouter;