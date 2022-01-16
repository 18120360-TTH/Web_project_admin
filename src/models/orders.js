const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('orders', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customer_username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    total_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    shipping_fee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 25
    },
    final_cost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    delivery_status: {
      type: DataTypes.ENUM('Packed', 'In transit', 'Delivered', 'Chargeback'),
      allowNull: true,
      defaultValue: "Packed"
    },
    payment_method: {
      type: DataTypes.ENUM('COD'),
      allowNull: true
    },
    receiver_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    customer_phone_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    customer_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    expected_arriving_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('now() + interval 7 day')
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "customer_username",
        using: "BTREE",
        fields: [
          { name: "customer_username" },
        ]
      },
    ]
  });
};
