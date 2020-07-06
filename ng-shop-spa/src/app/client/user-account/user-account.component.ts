import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NumberOnlyService } from 'src/app/_services/number-only.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  user: User;
  userAccountForm: FormGroup;

  constructor(
    private numberOnlyService: NumberOnlyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadPersonalInfo();
    this.initUserAccountForm();
  }

  onValidate($event) {
    return this.numberOnlyService.onValidate($event);
  }

  initUserAccountForm() {
    this.userAccountForm = new FormGroup({
      fullname: new FormControl(this.user?.fullName, Validators.required),
      phoneNumber: new FormControl(this.user?.phoneNumber, Validators.required),
      isMale: new FormControl(this.user?.isMale, Validators.required),
      email: new FormControl({ value: this.user?.email, disabled: true }, Validators.required),
      addressNumber: new FormControl(this.user?.addressNumber, Validators.required),
      district: new FormControl(this.user?.district, Validators.required),
      city: new FormControl(this.user?.city, Validators.required)
    });
  }

  loadPersonalInfo() {
    if (this.authService.decodedToken) {
      this.userService
        .getPersonalInfo(this.authService.decodedToken.nameid)
        .subscribe((response: User) => {
          this.user = response;
        }, error => {
          console.log(error);
        }, () => {
          this.initUserAccountForm();
        });
    } else {
      console.log('error, please login');
    }
  }

  onSubmit() {
    if (this.userAccountForm.valid) {
      this.userService
        .updatePersonalInfo(this.authService.decodedToken.nameid, this.userAccountForm.value)
        .subscribe(() => { }, error => {
          console.log(error);
        }, () => { alert('Cập nhật thông tin thành công!'); });
    }
  }
}
