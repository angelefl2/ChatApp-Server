'use strict';
const { 
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mensaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mensaje.init({
    de: DataTypes.STRING,
    para: DataTypes.STRING,
    mensaje: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mensaje',
  });
  return Mensaje;
};