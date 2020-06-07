import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from 'src/app/_guards/can-deactivate.guard';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, CanComponentDeactivate {

  constructor() { }

  ngOnInit(): void {
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return confirm('Do you want to discard the changes?');
  }
}
