import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../Post';

@Component({
  selector: 'app-seventh-comp',
  templateUrl: './seventh-comp.component.html',
  styleUrls: ['./seventh-comp.component.scss']
})
export class SeventhCompComponent implements OnInit {
  name: string = "John Carter";
  age: number = 48;
  posts: Post[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((data) => {
      this.posts = data;
    });
  }

  ngOnInit(): void {
  }

}
