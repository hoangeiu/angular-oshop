import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category, Product } from 'src/app/shared/models/app-common-model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories: Category[];
  product: Product;
  id;
  @ViewChild('f', { static: true }) productForm: NgForm;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.subscription = this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(take(1))
        .subscribe((product) => {
          this.product = product;
          this.productForm.setValue({
            title: this.product.title,
            price: this.product.price,
            category: this.product.category,
            imageUrl: this.product.imageUrl,
          });
        });
    }

    // this.productForm.valueChanges.subscribe((data) => (this.product = data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(product: NgForm) {
    if (this.id) this.productService.update(this.id, product.value);
    else this.productService.create(product.value);
    this.router.navigate(['/admin/products']);
  }

  onDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
