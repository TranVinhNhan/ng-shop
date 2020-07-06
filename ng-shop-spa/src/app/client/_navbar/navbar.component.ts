import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { CartService } from 'src/app/_services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount: number;
  cartCountSubscription: Subscription;

  constructor(private authService: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartCount();
  }

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    if (this.authService.decodedToken.role === 'Admin') {
      return true;
    }
    return false;
  }

  loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.cartCountSubscription = this.cartService.cartCount.subscribe((cartCount: number) => {
      this.cartCount = cartCount;
    });
    this.cartService.updateCartCount(cart ? cart.length : 0);
  }

  getUsername(): string {
    return this.authService.decodedToken.unique_name;
  }

  logout() {
    this.authService.logout();
  }
}
