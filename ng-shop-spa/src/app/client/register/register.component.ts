import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from 'src/app/_guards/can-deactivate.guard';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, CanComponentDeactivate {

  registerForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return confirm('Do you want to discard the changes?');
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
}
