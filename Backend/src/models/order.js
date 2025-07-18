const Sequelize = require("sequelize");
const db = require("../config/db_config")

const Order = db.define('Order', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    totalAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    paymentStatus: {
        type: Sequelize.ENUM(
            "Pending", "Paid", "Failed"
        ),
        default: "Pending"
    },
    deliveryStatus: {
        type: Sequelize.ENUM(
            "Processing", "Shipped", "Delivered"
        ),
        default: "Processing"
    }
})

module.exports = Order