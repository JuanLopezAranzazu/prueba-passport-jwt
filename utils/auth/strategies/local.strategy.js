const { Strategy } = require("passport-local");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UserService = require("../../../services/user.service");
const userService = new UserService();

const LocalStrategy = new Strategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, done) => {
    try {
      const user = await userService.findByUsername(username);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
