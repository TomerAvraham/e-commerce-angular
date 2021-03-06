import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Product } from '../interfaces/product';
import { SnackBarService } from './snack-bar.service';
import { BASE_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private snackBar: SnackBarService) {}

  private ENDPOINT: String = `${BASE_URL}product/`;

  public activeTab: any = true;
  public categories: Category[] = [];
  public products: Product[] = [];
  public allProducts: Product[] = [];

  getAllCategories() {
    return this.http.get(this.ENDPOINT + 'allCategory').subscribe(
      (res: any) => {
        this.categories = res.categories;
        this.products = this.allProducts;
      },
      (err) => {
        console.log(err);
        this.snackBar.openSnackBar(`${err.message}`, '');
      }
    );
  }

  onClickAllProducts() {
    this.activeTab = true;
    if (!this.allProducts.length) {
      this.getAllProducts();
    } else {
      this.products = this.allProducts;
      return;
    }
  }

  getProductByCategory(categoryId: String) {
    return this.http
      .get(this.ENDPOINT + `productsByCategory/${categoryId}`)
      .subscribe(
        (res: any) => {
          this.products = res.products;
        },
        (err) => {
          console.log(err);
          this.snackBar.openSnackBar(`${err.message}`, '');
        }
      );
  }

  getAllProducts() {
    return this.http.get(this.ENDPOINT + `allProducts`).subscribe(
      (res: any) => {
        this.allProducts = res.products;
      },
      (err) => {
        console.log(err);
        this.snackBar.openSnackBar(`${err.message}`, '');
      }
    );
  }

  handleProductSearch(event) {
    const inputValue = event.target.value;
    this.activeTab = {};

    if (inputValue === '') {
      this.products = this.allProducts;
    }

    this.products = this.allProducts.filter((product) =>
      product.name.toUpperCase().includes(inputValue.toUpperCase())
    );
  }

  handleUpdateProduct(products: Product[]) {
    this.activeTab = true;
    this.allProducts = products;
    this.products = products;
  }
}
