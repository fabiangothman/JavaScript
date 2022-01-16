import { Component } from '@angular/core';

@Component({
    selector: 'hello-world1',
    template: `
        <div class="hello-world1">
            <h1>Hello World</h1>
            <h2>First sample Component</h2>
        </div>
    `,
    styles: ['.hello-world1{background-color:#000; color:#fff;}']
})
export class HelloWorld1 {
}