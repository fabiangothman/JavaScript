import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fourth-comp',
  templateUrl: './fourth-comp.component.html',
  styleUrls: ['./fourth-comp.component.scss']
})
export class FourthCompComponent implements OnInit {
  name: string = "Fabián Murillo";
  age: number = 27;
  address: {
    street: string,
    city: string
  };
  hobbies: string[];
  users: string[] = ["Ryan", "Joe", "Cameron"];

  constructor() {
    this.address = {
      street: "False street 123",
      city: "Bogotá"
    };
    this.hobbies = ["Running", "Programming", "Hiking", "Soccer", "Learn"];
  }

  ngOnInit(): void {
  }

}
