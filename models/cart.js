import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cart extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cart: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'item_product',
        key: 'cart_id'
      }
    }
  }, {
    sequelize,
    tableName: 'cart',
    schema: 'public',
    timestamps: false
  });
  }
}