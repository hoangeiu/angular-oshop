import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;

  constructor(private authService: AuthService) {
    authService.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
  }
}
