import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';
import Supplier from '../models/supplier';



class Product extends Model {
  public id!: number;
  public name!: string;
  public sku!: string;
  public description?: string;
  public price!: number;
  public supplierId!: number;
  public quantity!: number;
  public stock!: number;
  public barcode!: string; 
  public readonly supplier?: Supplier;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  barcode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'suppliers',
      key: 'id',
    },
  },
},

{
  sequelize,
  modelName: 'Product',
  tableName: 'Products',
  timestamps: false,

});

export default Product;


