import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private snackbarService: SnackBarService
  ) {}

  ENDPOINT = 'http://localhost:5000/api/admin/';

  public editProduct: Product;
  public isAddProductClick: Boolean = false;

  setEditProduct(product: Product) {
    this.isAddProductClick = false;
    this.editProduct = product;
  }

  addProductClick() {
    this.isAddProductClick = true;
  }

  setUpdateProduct(updateProduct: Product, productId: String) {
    this.http
      .put(this.ENDPOINT + `update/${productId}`, updateProduct)
      .subscribe(
        (res: any) => {
          this.productService.handleUpdateProduct(res.products);
        },
        (err) => {
          this.snackbarService.openSnackBar(`${err.message}`, 'OK');
        }
      );
  }

  addNewProduct(newProduct: any) {
    this.http.post(this.ENDPOINT + 'addProduct', newProduct).subscribe(
      (res: any) => {
        this.productService.handleUpdateProduct(res.products);
        this.snackbarService.openSnackBar('New Product Added Successfully', '');
      },
      (err) => {
        this.snackbarService.openSnackBar(`${err.message}`, 'OK');
      }
    );
  }
}
