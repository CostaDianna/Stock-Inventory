

import { Request, Response } from 'express';
import sequelize from '../database/database';


export async function associateSupplierToProduct(req: Request, res: Response) {
  const { productId, supplierId } = req.body;

  try {
    const associationExists = await sequelize.models.product_supplier.findOne({
      where: { productId, supplierId }
    });

    if (associationExists) {
      return res.status(400).json({ error: 'O fornecedor já está associado a este produto' });
    }

    await sequelize.models.product_supplier.create({ productId, supplierId });
    return res.status(201).json({ message: 'Fornecedor associado ao produto com sucesso' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}


export async function dissociateSupplierFromProduct(req: Request, res: Response) {
  const { productId, supplierId } = req.body;

  try {
    await sequelize.models.product_supplier.destroy({
      where: { productId, supplierId }
    });
    return res.status(200).json({ message: 'Fornecedor dissociado com sucesso' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

export default sequelize;
