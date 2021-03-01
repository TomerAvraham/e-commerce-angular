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

  _id = new FormControl('', [Validators.required]);

  name = new FormControl('', [Validators.required]);

  price = new FormControl(0, [Validators.required]);

  image = new FormControl('', [Validators.required]);

  category = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.editProductForm = this.formBuilder.group({
      _id: this._id,
      name: this.name,
      price: this.price,
      image: this.image,
      category: this.category,
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
