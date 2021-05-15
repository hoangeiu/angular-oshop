export interface Product {
  key: string;
  payload: ProductModel;
}

export interface ProductModel {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface Category {
  key: string;
  payload: CategoryModel;
}

export interface CategoryModel {
  name: string;
}
