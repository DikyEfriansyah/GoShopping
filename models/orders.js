import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    order_no: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    totalprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("OPEN","CLOSED","CANCELED"),
      allowNull: true,
      defaultValue: "OPEN"
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}