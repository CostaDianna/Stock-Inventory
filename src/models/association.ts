
import Supplier from './supplier';
import Product from './product';

Supplier.hasMany(Product, {
  foreignKey: 'supplierId',
  as: 'products'
});

Product.belongsTo(Supplier, {
  foreignKey: 'supplierId',
  as: 'supplier'
});
