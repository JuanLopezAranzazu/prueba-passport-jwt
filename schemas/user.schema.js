const Joi = require("joi");

const id = Joi.number().integer();
const fullname = Joi.string().min(3).max(15);
const username = Joi.string().min(3).max(15);
const password = Joi.string().regex(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);
const role = Joi.string().valid("admin", "customer");

const createUserSchema = Joi.object({
  fullname: fullname.required(),
  username: username.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  fullname: fullname,
  username: username,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
