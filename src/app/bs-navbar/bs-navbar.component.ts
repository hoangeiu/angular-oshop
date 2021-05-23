import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Cart } from '../models/app-common-model';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<Cart>;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.authService.appUser$.subscribe((appUser) => (this.appUser = appUser));

    this.cart$ = await this.shoppingCartService.getCart();
  }

  onLogout() {
    this.authService.logout();
  }
}
