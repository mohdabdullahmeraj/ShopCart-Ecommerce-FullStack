    const Sequelize = require("sequelize");
    const db = require("../config/db_config")

    const Cart = db.define('Cart',{
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    })

    module.exports = Cart