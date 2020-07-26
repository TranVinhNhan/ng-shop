import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onToggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
