const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ISBN: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "ISBN"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    number_of_pages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    origin_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity_in_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    release_year: {
      type: "YEAR",
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'books',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "book_id" },
        ]
      },
      {
        name: "ISBN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ISBN" },
        ]
      },
    ]
  });
};
