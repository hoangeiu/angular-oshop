import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/app-common-model';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss'],
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input() cart: Cart;

  constructor() {}

  ngOnInit(): void {}
}
