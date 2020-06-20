import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from 'src/app/_guards/can-deactivate.guard';
import { Observable } from 'rxjs';
import { UrlTree, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, CanComponentDeactivate {

  genders = ['Nam', 'Nữ'];
  user: any = {};
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.registerForm.dirty && this.registerForm.invalid) {
      return confirm('Bạn muốn rời khỏi trang này chứ? Mọi thay đổi chưa được lưu sẽ bị xóa!');
    }
    return true;
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      gender: new FormControl('Nam'),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.matchPassword });
  }

  matchPassword(formGroup: FormGroup): { [s: string]: boolean } {
    if (formGroup.get('password').value === formGroup.get('confirmPassword').value) {
      return null;
    }
    return { matchPassword: true };
  }

  // https://stackoverflow.com/questions/45418242/how-to-allow-only-numbers-in-html-input-type-text-using-typescript
  onValidate($event) {
    const regex: RegExp = new RegExp(/^[0-9]{1,}$/g);
    const specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
    if (specialKeys.indexOf($event.key) !== -1) {
      return;
    } else {
      if (regex.test($event.key)) {
        return true;
      } else {
        return false;
      }
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((response: any) => {
        console.log(response);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      }, () => {
        this.user.email = this.registerForm.get('email').value;
        this.user.password = this.registerForm.get('password').value;
        this.authService.login(this.user).subscribe((response: any) => {
          console.log(response);
          alert('Đăng kí tài khoản thành công!');
        }, error => {
          console.log(error);
        });
      });
    }
  }
}

