export interface Product {
  id?: number;
  name: string;
  image?: string;
  price: number | string;
  stock: number | string;
  createdAt?: Date;
  updatedAt?: Date;
  file?: any;
  file_obj?: string;
}
