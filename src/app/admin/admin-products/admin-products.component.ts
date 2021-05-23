import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/app-common-model';
import { ProductService } from 'src/app/services/product.service';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  private subscription: Subscription;

  faEdit = faEdit;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = products;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: HTMLInputElement) {
    this.filteredProducts = query.value
      ? this.products.filter((p) => {
          return p.title.toLowerCase().includes(query.value.toLowerCase());
        })
      : this.products;
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
