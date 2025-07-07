const { Sequelize } = require("sequelize");
const db = require("../config/db_config");
const Product = require("./product");

const ProductImage = db.define('ProductImage', {
    imgUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isMain: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    }
})

module.exports = ProductImage