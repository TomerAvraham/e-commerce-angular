import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ENDPOINT = 'http://localhost:5000/api/admin/';
  public editProduct: Product;

  setEditProduct(product: Product) {
    this.editProduct = product;
  }

  setUpdateProduct(updateProduct: Product, productId: String) {
    this.http.put(this.ENDPOINT + `update/${productId}`, updateProduct);
  }
}
