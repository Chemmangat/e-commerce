import { getProducts, getCategories, Category } from "@/utils/api";
import AllProductsClient from "./all-products-client";

export default async function ProductsPage() {
  const productsData = await getProducts(100);
  const categories: Category[] = await getCategories();

  return (
    <AllProductsClient
      initialProducts={productsData.products}
      initialCategories={categories}
    />
  );
}
