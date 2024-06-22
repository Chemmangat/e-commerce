import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}
interface ApiCategory {
  slug: string;
  name: string;
  url?: string;
}

export const getProducts = async (limit = 10): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>(`/products?limit=${limit}`);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<ApiCategory[]> = await api.get(
      "/products/categories"
    );

    return response.data.map((category: ApiCategory) => ({
      slug: category.slug.toLowerCase().replace(/\s+/g, "-"),
      name: category.name,
      url:
        category.url ||
        `/category/${category.slug.toLowerCase().replace(/\s+/g, "-")}`,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // or throw error based on your error handling strategy
  }
};
export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};


export default api;
