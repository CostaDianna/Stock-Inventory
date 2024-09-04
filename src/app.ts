
import express from 'express';
import sequelize from './database/database';
import productRoutes from './routes/productRoutes';
import supplierRoutes from './routes/supplierRoutes';
import associationRoutes from './routes/associationRoutes';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', supplierRoutes);
app.use('/api', associationRoutes);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Diana!');
});

sequelize.sync({ alter: true }).then(() => {

  console.log('Banco de dados sincronizado.');

  app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);
  });

}).catch((error: any) => {

  console.error('Erro ao sincronizar com o banco de dados:', error);
});
export default app;
