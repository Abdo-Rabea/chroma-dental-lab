export async function getProducts() {
  let products = [];
  try {
    products = await window.products.getProducts();
  } catch (err) {
    throw new Error('تعذر تحميل المنتجات');
  }
  return products;
}

export async function updateProduct(productData) {
  try {
    return await window.products.updateProduct(productData);
  } catch (err) {
    throw new Error('تعذر تعديل البيانات');
  }
}
