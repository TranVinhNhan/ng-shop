import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent implements OnInit {

  title: string;
  user: User;
  userModalForm: FormGroup;
  constructor(public bsModalRef: BsModalRef, private userService: UserService) { }

  ngOnInit(): void {
    this.initUserModalForm();
  }

  initUserModalForm() {
    this.userModalForm = new FormGroup({
      email: new FormControl({value: this.user.email, disabled: true}, Validators.required),
      fullName: new FormControl(this.user.fullName, Validators.required),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.required),
      role: new FormControl(this.user.role, Validators.required),
      isMale: new FormControl(this.user.isMale, Validators.required)
    });
  }

  onSubmit(id: number) {
    if (this.userModalForm.valid) {
      this.userService.updateUser(this.userModalForm.value, id).subscribe((response: any) => {
        console.log(response);
        this.user = Object.assign(this.user, this.userModalForm.value);
        this.bsModalRef.hide();
      }, error => {
        console.log(error);
      });
    }
  }
}
