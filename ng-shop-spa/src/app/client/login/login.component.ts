import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private alertifyService: AlertifyService
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(next => {
        if (this.authService.isAuthenticated()) { }
      }, error => {
        console.log(error);
      }, () => {
        if (this.authService.decodedToken.role === 'Admin') {
          this.router.navigate(['/admin']);
          this.alertifyService.success('Đăng nhập thành công bằng tài khoản admin');
        } else {
          this.router.navigate(['/']);
          this.alertifyService.success('Đăng nhập thành công');
        }
      });
    }
  }
}
