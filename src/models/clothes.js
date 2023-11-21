import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


  export const Clothes = sequelize.define( 'clothes', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    name: {
        type: DataTypes.STRING
    },
    image: { 
        type: DataTypes.BLOB('long'), // <- type for image ( database :postgresql )
        allowNull: true 
      },
      price: {
        type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
  },    

});