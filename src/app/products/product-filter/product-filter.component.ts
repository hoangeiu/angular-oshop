import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/app-common-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  categories: Category[];
  private categoriesSub: Subscription;
  @Input() category;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoriesSub = this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }
}
