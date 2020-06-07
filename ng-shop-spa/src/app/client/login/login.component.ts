import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.login();
    this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        this.router.navigate(['/admin']);
      }
    });
  }
}
