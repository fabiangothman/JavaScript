import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third-component-auto',
  templateUrl: './third-component-auto.component.html',
  styleUrls: ['./third-component-auto.component.scss']
})
export class ThirdComponentAutoComponent implements OnInit {

  title: string = "Welcome to third component";
  subtitle: string = "generated automatically";
  users: string[] = ["Ryan", "Joe", "Cameron"];
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
