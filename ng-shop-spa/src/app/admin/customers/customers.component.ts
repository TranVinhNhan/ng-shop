import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  bsModalRef: BsModalRef;
  users: User[] = [];
  constructor(private userService: UserService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  onDelete(id: number) {
    if (confirm('Bạn có chắc muốn xóa tài khoản này không?')) {
      this.userService.deleteUser(id).subscribe((response: any) => {
        console.log(response);
        const index = this.users.indexOf(this.users.find(x => x.id === id), 0);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      }, error => {
        console.log(error);
      });
    }
  }

  openModalWithCustomerModalComponent(user: User) {
    const initialState = {
      title: 'Cập nhật thông tin người dùng',
      user
    };
    this.bsModalRef = this.modalService.show(CustomerModalComponent, { initialState });
  }
}
