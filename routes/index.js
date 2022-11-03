const express = require("express");

const userRouter = require("./user.router");
const authRouter = require("./auth.router");
const salaryRouter = require("./salary.router");

function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", userRouter);
  router.use("/auth", authRouter);
  router.use("/salaries", salaryRouter);
}

module.exports = routes;
