import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Imports
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

// Custom components
import { HelloWorld1 } from './first-comp/first.component';
import { HelloWorld2 } from './second-comp/second.component';
import { ThirdComponentAutoComponent } from './third-component-auto/third-component-auto.component';
import { FourthCompComponent } from './fourth-comp/fourth-comp.component';
import { UserComponent } from './user/user.component';
import { FifthCompComponent } from './fifth-comp/fifth-comp.component';
import { SixthCompComponent } from './sixth-comp/sixth-comp.component';
import { SeventhCompComponent } from './seventh-comp/seventh-comp.component';

//Services
import { DataService } from './data.service';
import { AboutComponent } from './about/about.component';

const routes: Route[] = [
  { path: '', component: SeventhCompComponent },
  { path: 'second', component: HelloWorld2 },
  { path: 'third', component: ThirdComponentAutoComponent },
  { path: 'fourth', component: FourthCompComponent },
  { path: 'fifth', component: FifthCompComponent },
  { path: 'sixth', component: SixthCompComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HelloWorld1,
    HelloWorld2,
    ThirdComponentAutoComponent,
    FourthCompComponent,
    UserComponent,
    FifthCompComponent,
    SixthCompComponent,
    SeventhCompComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
