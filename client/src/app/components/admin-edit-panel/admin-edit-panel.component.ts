import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-edit-panel',
  templateUrl: './admin-edit-panel.component.html',
  styleUrls: ['./admin-edit-panel.component.css'],
})
export class AdminEditPanelComponent implements OnInit, OnChanges {
  @Input() product: Product;

  constructor(
    public adminService: AdminService,
    public productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  editProductForm: FormGroup;
  addProductForm: FormGroup;

  _id = new FormControl('', [Validators.required]);

  name = new FormControl('', [Validators.required]);

  price = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);

  image = new FormControl('', [Validators.required]);

  category = new FormControl('', [Validators.required]);

  add_name = new FormControl('', [Validators.required]);

  add_price = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);

  add_image = new FormControl('', [Validators.required]);

  add_category = new FormControl('', [Validators.required]);

  handleUpdateProduct() {
    this.adminService.setUpdateProduct(
      this.editProductForm.value,
      this.product._id
    );
  }

  handelNewProduct() {
    this.adminService.addNewProduct(this.addProductForm.value);
  }

  ngOnInit(): void {
    this.editProductForm = this.formBuilder.group({
      _id: this._id,
      name: this.name,
      price: this.price,
      image: this.image,
      category: this.category,
    });

    this.addProductForm = this.formBuilder.group({
      name: this.add_name,
      price: this.add_price,
      image: this.add_image,
      category: this.add_category,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product.firstChange) {
      return;
    }
    this._id.setValue(`${changes.product.currentValue._id}`),
      this.name.setValue(`${changes.product.currentValue.name}`),
      this.price.setValue(`${changes.product.currentValue.price}`),
      this.image.setValue(`${changes.product.currentValue.image}`),
      this.category.setValue(`${changes.product.currentValue.category}`);
  }
}
