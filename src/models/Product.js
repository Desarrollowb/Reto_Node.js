import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Clothes } from './clothes.js';

  export const Product = sequelize.define('products', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    },

    brand: {
        type: DataTypes.STRING
    },

    
    description: {
        type: DataTypes.STRING
    },
      
}, {
    timestamps: true
});

Product.hasMany(Clothes, {
    foreinkey: 'productId',
    sourceKey: 'id'
})


Clothes.belongsTo(Product, {
    foreinkey: 'productId',
    targetId: 'id'  
})

