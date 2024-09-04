import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database';
import Product from '../models/product';

class Supplier extends Model{
  [x: string]: any;
  public id!: number;
  public name!: string;
  public cnpj!: string;
  public address?: string;
  public contact?: string;
  public sku!: string;


  public readonly product?: Product[];
}


Supplier.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  contact: {
    type: DataTypes.STRING,
  },
},
{
  sequelize,
  modelName: 'Supplier',
  tableName: 'suppliers',
  timestamps: false,

});

export default Supplier;
