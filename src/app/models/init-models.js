var DataTypes = require("sequelize").DataTypes;
var _authors = require("./authors");
var _books = require("./books");
var _carts = require("./carts");
var _categories_of_book = require("./categories_of_book");
var _images = require("./images");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _reviews = require("./reviews");
var _users = require("./users");

function initModels(sequelize) {
  var authors = _authors(sequelize, DataTypes);
  var books = _books(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var categories_of_book = _categories_of_book(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var reviews = _reviews(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  books.belongsToMany(orders, { as: 'order_id_orders', through: order_items, foreignKey: "book_id", otherKey: "order_id" });
  books.belongsToMany(users, { as: 'customer_username_users', through: carts, foreignKey: "book_id", otherKey: "customer_username" });
  books.belongsToMany(users, { as: 'customer_username_users_reviews', through: reviews, foreignKey: "book_id", otherKey: "customer_username" });
  orders.belongsToMany(books, { as: 'book_id_books_order_items', through: order_items, foreignKey: "order_id", otherKey: "book_id" });
  users.belongsToMany(books, { as: 'book_id_books', through: carts, foreignKey: "customer_username", otherKey: "book_id" });
  users.belongsToMany(books, { as: 'book_id_books_reviews', through: reviews, foreignKey: "customer_username", otherKey: "book_id" });
  authors.belongsTo(books, { as: "book", foreignKey: "book_id" });
  books.hasMany(authors, { as: "authors", foreignKey: "book_id" });
  carts.belongsTo(books, { as: "book", foreignKey: "book_id" });
  books.hasMany(carts, { as: "carts", foreignKey: "book_id" });
  categories_of_book.belongsTo(books, { as: "book", foreignKey: "book_id" });
  books.hasMany(categories_of_book, { as: "categories_of_book", foreignKey: "book_id" });
  images.belongsTo(books, { as: "book", foreignKey: "book_id" });
  books.hasMany(images, { as: "images", foreignKey: "book_id" });
  order_items.belongsTo(books, { as: "book", foreignKey: "book_id" });
  books.hasMany(order_items, { as: "order_items", foreignKey: "book_id" });
  reviews.belongsTo(books, { as: "book", foreignKey: "book_id" });
  books.hasMany(reviews, { as: "reviews", foreignKey: "book_id" });
  order_items.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(order_items, { as: "order_items", foreignKey: "order_id" });
  carts.belongsTo(users, { as: "customer_username_user", foreignKey: "customer_username" });
  users.hasMany(carts, { as: "carts", foreignKey: "customer_username" });
  orders.belongsTo(users, { as: "customer_username_user", foreignKey: "customer_username" });
  users.hasMany(orders, { as: "orders", foreignKey: "customer_username" });
  reviews.belongsTo(users, { as: "customer_username_user", foreignKey: "customer_username" });
  users.hasMany(reviews, { as: "reviews", foreignKey: "customer_username" });

  return {
    authors,
    books,
    carts,
    categories_of_book,
    images,
    order_items,
    orders,
    reviews,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
