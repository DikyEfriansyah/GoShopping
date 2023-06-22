import _sequelize, { Sequelize } from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _cart from "./cart.js";
import _category from "./category.js";
import _item_product from "./item_product.js";
import _order_line_item from "./order_line_item.js";
import _orders from "./orders.js";
import _products from "./products.js";
import _users from "./users.js";
import config from "../../config/config.js";

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_password,
  {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    pool: {
      max: 5,
      min: 0,
      idle: 4000,
      acquire: 5000,
    },
  }
);

const initModels = (sequelize) => {
  const cart = _cart.init(sequelize, DataTypes);
  const category = _category.init(sequelize, DataTypes);
  const item_product = _item_product.init(sequelize, DataTypes);
  const order_line_item = _order_line_item.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  products.belongsTo(category, { as: "category", foreignKey: "category_id" });
  category.hasMany(products, { as: "products", foreignKey: "category_id" });
  cart.belongsTo(item_product, { as: "cart_item_product", foreignKey: "cart" });
  item_product.hasMany(cart, { as: "carts", foreignKey: "cart" });
  order_line_item.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(order_line_item, {
    as: "order_line_items",
    foreignKey: "order_id",
  });
  item_product.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(item_product, {
    as: "item_products",
    foreignKey: "product_id",
  });
  order_line_item.belongsTo(products, {
    as: "product",
    foreignKey: "product_id",
  });
  products.hasMany(order_line_item, {
    as: "order_line_items",
    foreignKey: "product_id",
  });
  item_product.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(item_product, { as: "item_products", foreignKey: "user_id" });
  orders.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(orders, { as: "orders", foreignKey: "user_id" });

  return {
    cart,
    category,
    item_product,
    order_line_item,
    orders,
    products,
    users,
  };
};
const models = initModels(sequelize);
export default models;
export { sequelize };