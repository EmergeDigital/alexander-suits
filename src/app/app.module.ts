import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
