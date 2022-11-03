const express = require("express");
const salaryRouter = express.Router();
const passport = require("passport");

const SalaryService = require("../services/salary.service");
const salaryService = new SalaryService();

const {
  createSalarySchema,
  updateSalarySchema,
  getSalarySchema,
} = require("../schemas/salary.schema");

const validatorHandler = require("../middlewares/validator.handler");
const { checkRoles, checkApiKey } = require("../middlewares/auth.handler");

const { models } = require("./../libs/sequelize");

const dataForSalaries = {
  userId: 3,
  amount: 2,
};

const MIN_SALARY = 400000;
const MAX_SALARY = 900000;

function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getStringDate(date) {
  let stringDate = "";
  const arrayDate = date.toLocaleDateString().split("/");
  stringDate = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`;
  return stringDate;
}

function generateSalaries(dataForSalaries) {
  try {
    const { userId, amount } = dataForSalaries;
    for (let index = 0; index < amount; index++) {
      const value = randomValue(MIN_SALARY, MAX_SALARY);
      const startDate = randomDate(new Date(2019, 0, 1), new Date());
      const endDate = randomDate(startDate, new Date());
      const dataForSalary = {
        userId,
        value,
        startDate: getStringDate(startDate),
        endDate: getStringDate(endDate),
      };
      models.Salary.create(dataForSalary);
    }
  } catch (error) {
    console.log(error.message);
  }
}

// generateSalaries(dataForSalaries);

const SalaryHisService = require("./../services/salary-his.service");
const salaryHisService = new SalaryHisService();

salaryRouter.get(
  "/his",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const salaries = await salaryHisService.findAll();
      res.json(salaries);
    } catch (error) {
      next(error);
    }
  }
);

salaryRouter.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  async (req, res, next) => {
    try {
      const salaries = await salaryService.findAll();
      res.json(salaries);
    } catch (error) {
      next(error);
    }
  }
);

salaryRouter.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  validatorHandler(getSalarySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const salary = await salaryService.findById(id);
      res.json(salary);
    } catch (error) {
      next(error);
    }
  }
);

salaryRouter.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  // checkRoles("admin"),
  validatorHandler(createSalarySchema, "body"),
  async (req, res, next) => {
    try {
      const payload = req.body;
      const savedSalary = await salaryService.create(payload);
      res.status(201).json(savedSalary);
    } catch (error) {
      next(error);
    }
  }
);

salaryRouter.put(
  "/:id",
  validatorHandler(getSalarySchema, "params"),
  validatorHandler(updateSalarySchema, "body"),
  async (req, res, next) => {
    try {
      const { params, body } = req;
      const { id } = params;
      const updatedSalary = await salaryService.update(id, body);
      res.json(updatedSalary);
    } catch (error) {
      next(error);
    }
  }
);

salaryRouter.delete(
  "/:id",
  validatorHandler(getSalarySchema, "params"),
  async (req, res, next) => {
    try {
      const { params } = req;
      const { id } = params;
      const salaryId = await salaryService.delete(id);
      res.status(204).json(salaryId);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = salaryRouter;
