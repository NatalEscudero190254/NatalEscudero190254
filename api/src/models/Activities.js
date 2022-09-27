const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
    // me falta saber como decir que sea unicamente entre 1 y 5
    difficulty:{
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 12,
            isEven(value) {
              if(value < 1 || value > 5) {
                throw new Error('Only between 1 & 5!')
              }
            }
          },
        allowNull: true
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    season:{
        type: DataTypes.ENUM("Verano", "Otoño", "Primavera", "Invierno"),
        allowNull: true
    },
    createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
  })}