import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  order$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.order$ = this.authService.user$.pipe(
      switchMap((u) => this.orderService.getOrderByUser(u.uid))
    );
  }
}
