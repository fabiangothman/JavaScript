import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sixth-comp',
  templateUrl: './sixth-comp.component.html',
  styleUrls: ['./sixth-comp.component.scss'],
})
export class SixthCompComponent implements OnInit {
  name: string = "John Carter";
  age: number = 48;

  constructor() { }

  ngOnInit(): void {
  }

}
