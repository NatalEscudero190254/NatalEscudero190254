const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // me falta saber como hacer un id de unicamente 3 letras
    id: {
      type: DataTypes.STRING(3),// CREOQ QUE SERIA ASI!.
      allowNull: false,
      primaryKey: true
    },
    flagImg: {
      type: DataTypes.STRING,
      //allowNull: false

    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subRegion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    
  });
};
