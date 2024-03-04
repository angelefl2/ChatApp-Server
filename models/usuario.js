'use strict';
const crypto = require('crypto'); // Importación de la librería crypto
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Usuario.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue : false
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  // Hook para generar un ID único antes de crear un nuevo usuario
  Usuario.beforeCreate((usuario, options) => {
    // Generar un hash único utilizando el correo electrónico y una semilla aleatoria
    const uniqueId = crypto.createHash('sha256')
      .update(usuario.email + Math.random().toString())
      .digest('hex');
    usuario.id = uniqueId;
  });

  return Usuario;
};