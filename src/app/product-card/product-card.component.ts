import { Component, Input, OnInit } from '@angular/core';
import { Cart, Product } from '../models/app-common-model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() showActions = true;
  @Input() shoppingCart: Cart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
}
