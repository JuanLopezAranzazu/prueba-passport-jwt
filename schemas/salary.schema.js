const Joi = require("joi");

const id = Joi.number().integer();
const value = Joi.number().integer().min(400000).max(900000);
const userId = Joi.number().integer();
const startDate = Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/);
const endDate = Joi.string().regex(/^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/);

const createSalarySchema = Joi.object({
  value: value.required(),
  userId: userId.required(),
  startDate: startDate.required(),
  endDate: endDate.required(),
});

const updateSalarySchema = Joi.object({
  value: value,
  userId: userId,
  startDate: startDate,
  endDate: endDate,
});

const getSalarySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createSalarySchema,
  updateSalarySchema,
  getSalarySchema,
};
