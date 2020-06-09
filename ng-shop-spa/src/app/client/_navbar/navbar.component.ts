import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUsername(): string {
    return this.authService.decodedToken.unique_name;
  }
}
