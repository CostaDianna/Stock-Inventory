//import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
//import Product from "../models/product";
//import Supplier from "../models/supplier";

// Configuração do Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
  //storage: './database.sqlite'
});

// Sincronização do banco de dados
//const syncDatabase = async () => {
  //try {
   /// await sequelize.sync({ force: false });
  // / console.log('Banco de dados sincronizado!');
  //} catch (err) {
  //  console.error('Erro ao sincronizar o banco de dados:', err);
 // }
//};
//syncDatabase();
export default sequelize ;