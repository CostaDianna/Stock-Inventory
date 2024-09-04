import { Request, Response } from "express";
import Supplier from "../models/supplier";
import Product from "../models/product";


export async function createSupplier(req: Request, res: Response) {
  const {sku, name, cnpj, address, contact } = req.body;

  try {

    const existingSupplier = await Supplier.findOne({ where: { cnpj } });

    if (existingSupplier) {
      return res
        .status(400)
        .json({ message: "Fornecedor com este CNPJ já está registrado!" });
    }

    const newSupplier = await Supplier.create({sku, name, cnpj, address, contact });
    res
      .status(201)
      .json({
        message: "Fornecedor registrado com sucesso!",
        supplier: newSupplier,
      });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar fornecedor.", error: error.message });
  }
}

export const getSupplier = async (req: Request, res: Response) => {
  const { cnpj } = req.params;

  try {

    const supplier = await Supplier.findOne({ where: { cnpj } });

    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado!" });
    }

    res.status(200).json(supplier);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao buscar fornecedor.", error: error.message });
  }
};

export const putSupplier = async (req: Request, res: Response) => {
  const { cnpj } = req.params;
  const {sku, name, address, contact } = req.body;

  try {

    const supplier = await Supplier.findOne({ where: { cnpj } });

    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado!" });
    }

    supplier.name = name;
    supplier.address = address;
    supplier.contact = contact;
    supplier.sku = sku;
    await supplier.save();

    res
      .status(200)
      .json({ message: "Fornecedor atualizado com sucesso!", supplier });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar fornecedor.", error: error.message });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  const { cnpj } = req.params;

  try {

    const supplier = await Supplier.findOne({ where: { cnpj } });

    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado!" });
    }

    await supplier.destroy();

    res.status(200).json({ message: "Fornecedor excluído com sucesso!" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao excluir fornecedor.", error: error.message });
  }
};


export const getSupplierByProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const productWithSupplier = await Product.findOne({
      where: { id: productId },
      include: [{ model: Supplier, as: "supplier" }],
    });

    if (!productWithSupplier) {
      return res.status(404).json({ message: "Produto não atualizado!" });
    }

    res.status(200).json(productWithSupplier.supplierId);
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Erro ao buscar fornecedor pelo produto.",
        error: error.message,
      });
  }
};


export const getProductsBySupplier = async (req: Request, res: Response) => {
  const { supplierId } = req.params;

  try {
    const supplierWithProducts = await Supplier.findOne({
      where: { id: supplierId },
      include: [{ model: Product, as: "products" }],
    });

    if (!supplierWithProducts) {
      return res.status(404).json({ message: "Fornecedor não encontrado!" });
    }

    res.status(200).json(supplierWithProducts.product);
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Erro  ao buscar fornecedor pelo produto.",
        error: error.message,
      });
  }
};
