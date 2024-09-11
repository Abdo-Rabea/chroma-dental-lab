export async function createProduct(productData) {
  try {
    return await window.products.createProduct(productData);
  } catch (err) {
    throw new Error('تعذر إضافة المنتج');
  }
}

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

export async function deleteProduct(id) {
  try {
    return await window.products.deleteProduct(id);
  } catch (err) {
    throw new Error('حدث خطأ أثناء حذف المنتج');
  }
}
