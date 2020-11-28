'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userName: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isParentMember: DataTypes.BOOLEAN,
    isSitterMember: DataTypes.BOOLEAN,
    careAgeStart: DataTypes.INTEGER,
    careAgeEnd: DataTypes.INTEGER,
    sitterDesc: DataTypes.STRING,
    parentDesc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};