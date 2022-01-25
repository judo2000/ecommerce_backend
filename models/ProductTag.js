const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    // productTags id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // product_id column 
    product_id: {
      type: DataTypes.INTEGER,
      // references id in products table
      references: {
        model: 'Product',
        key: 'id',
      },
    },
    // tag id column
    tag_id: {
      type: DataTypes.INTEGER,
      // references id in tags table
      references: {
        model: 'Tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
