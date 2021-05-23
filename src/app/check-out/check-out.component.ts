import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/app-common-model';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<Cart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
