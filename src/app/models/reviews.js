const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    customer_username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'username'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'books',
        key: 'book_id'
      }
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rating: {
      type: DataTypes.ENUM('1_star','2_star','3_star','4_star','5_star'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reviews',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customer_username" },
          { name: "book_id" },
          { name: "review_date" },
        ]
      },
      {
        name: "book_id",
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
    ]
  });
};
