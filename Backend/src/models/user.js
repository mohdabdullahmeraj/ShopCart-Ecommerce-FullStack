const Sequelize = require("sequelize");
const db = require("../config/db_config")

const User = db.define('User',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'unique_user_email'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User