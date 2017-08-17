import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ng2-owl-carousel';
import 'hammerjs';



/*============================================================================
 Route Imports
 ============================================================================*/
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdMenuModule,
    OwlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
