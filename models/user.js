'use strict';
const bcrypt = require("bcryptjs")

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique(username) {
          return User.findOne({
            where: {
              username
            }
          })
          .then(foundUsername => {
            if (foundUsername) {
              throw new Error("username already exists")
            }
          })
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, options) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
        user.salt = salt
      },
      beforeUpdate(user, options) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(user.password, salt);
        user.password = hash
        user.salt = salt
      },
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};