const express = require("express");
const userRouter = express.Router();
const passport = require("passport");

const UserService = require("../services/user.service");
const userService = new UserService();
const UserHisService = require("./../services/user-his.service");
const userHisService = new UserHisService();

const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require("../schemas/user.schema");

const validatorHandler = require("../middlewares/validator.handler");
const { checkRoles, checkApiKey } = require("../middlewares/auth.handler");

const inputDataExclude = ["password"];

function validateDataExclude(dataForExclude) {
  const dataCorrect = ["fullname", "username", "password", "createdAt"];
  for (let index = 0; index < dataForExclude.length; index++) {
    const item = dataForExclude[index];
    if (typeof item !== "string" || !dataCorrect.includes(item)) {
      throw new Error(`Incorrect data for exclude item ${item}`);
    }
  }
  return dataForExclude;
}

userRouter.get(
  "/filter",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const { role } = req.query;
      const dataForExclude = validateDataExclude(inputDataExclude);
      const users = await userService.findByRole(role, dataForExclude);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/his",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const users = await userHisService.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      const user = await userService.findById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const savedUser = await userService.create(body);
      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const updatedUser = await userService.update(id, body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      const userId = await userService.delete(id);
      res.status(204).json(userId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userRouter;
