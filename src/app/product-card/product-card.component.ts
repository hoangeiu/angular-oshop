import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductModel } from '../models/app-common-model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductModel;
  @Input() showActions = true;

  constructor() {}

  ngOnInit(): void {}
}
