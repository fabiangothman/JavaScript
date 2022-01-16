import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fifth-comp',
  templateUrl: './fifth-comp.component.html',
  styleUrls: ['./fifth-comp.component.scss']
})
export class FifthCompComponent implements OnInit {
  users: string[] = ["Ryan", "Steve", "Joe", "Cameron"];

  constructor() { }

  ngOnInit(): void {
  }

  greetUser(user: string): void {
    alert(`Hello ${user}!`);
  }
  deleteUser = (user: string): void => {
    const index: number = this.users.findIndex((item) => item === user);
    if(index !== -1) this.users.splice(index, 1);
  }
  addUser = (newUser: HTMLInputElement): boolean => {
    // console.log(`newUser element: `, newUser.value);
    if(newUser.value !== "") this.users.push(newUser.value);
    newUser.value = "";
    newUser.focus();
    return false;
  }

}
