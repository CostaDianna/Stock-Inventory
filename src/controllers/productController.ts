import { Request, Response } from "express";
import Product from "../models/product";


export const createProduct = async (req: Request, res: Response) => {
  const { name, sku, barcode, description, price, quantity, supplierId } =
    req.body;

  try {

    const existingProduct = await Product.findOne({ where: { barcode } });

    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Produto com este código de barras já está registrado!" });
    }


    const newProduct = await Product.create({
      name,
      sku,
      barcode,
      description,
      price,
      quantity,
      supplierId,
    });
    res
      .status(201)
      .json({
        message: "Produto registrado com sucesso!",
        product: newProduct,
      });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar produto.", error: error.message });
  }
};
export const putProduct = async (req: Request, res: Response) => {
  const { barcode } = req.params;
  const { name, sku, description, price, quantity, supplierId } = req.body;

  try {
    const product = await Product.findOne({ where: { barcode } });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }


    await product.update({ name, sku, description, price, quantity, supplierId });

    res.status(200).json(product);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar produto.", error: error.message });
  }
};


export const getProduct = async (req: Request, res: Response) => {
  const { barcode } = req.params;
  const { name, sku, description, price, quantity, supplierId } = req.body;

  try {

    const product = await Product.findOne({ where: { barcode } });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }


    product.name = name;
    product.sku = sku;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.supplierId = supplierId;
    await product.save();

    res.status(200).json({ message: "Produto atualizado com sucesso!", product });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar produto.", error: error.message });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  const { barcode } = req.params;

  try {

    const product = await Product.findOne({ where: { barcode } });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    await product.destroy();

    res.status(200).json({ message: "Produto excluído com sucesso!" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao excluir produto.", error: error.message });
  }
};

export const getProductByBarcode = async (req: Request, res: Response) => {
  const { barcode } = req.params;

  try {
    const product = await Product.findOne({ where: { barcode } });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    res.status(200).json(product);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro buscar produtos.", error: error.message });
  }
};
