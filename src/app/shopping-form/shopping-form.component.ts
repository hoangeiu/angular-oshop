import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Cart } from '../models/app-common-model';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shopping-form',
  templateUrl: './shopping-form.component.html',
  styleUrls: ['./shopping-form.component.scss'],
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  @Input() cart: Cart;
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };

  userId: string;
  private userSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
