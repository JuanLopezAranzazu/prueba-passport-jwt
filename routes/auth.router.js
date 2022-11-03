const express = require("express");
const authRouter = express.Router();

const passport = require("passport");
const jwt = require("jsonwebtoken");

const { config } = require("./../config/config");

authRouter.post(
  "/",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const dataForToken = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(dataForToken, config.jwtSecret, {
        expiresIn: "1h",
      });
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = authRouter;
