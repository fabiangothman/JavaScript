import { Component } from '@angular/core';

@Component({
    selector: 'hello-world2',
    templateUrl: './second.component.html',
    styleUrls: ['./second.component.scss'],
})
export class HelloWorld2 {
    title: string = "Hello world, welcome to angular"
}