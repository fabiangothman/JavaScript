import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title: string = 'Task Traker';

  constructor() { }

  ngOnInit(): void {
  }

  toggleAddTask = () => {
    console.log("toggled");
  }

}