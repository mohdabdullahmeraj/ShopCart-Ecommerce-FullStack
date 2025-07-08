const Sequelize = require("sequelize");
const db = require("../config/db_config")

const Admin = db.define('Admin',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'unique_admin_email'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Admin