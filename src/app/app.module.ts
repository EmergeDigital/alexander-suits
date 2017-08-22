import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
 import { NguiMapModule} from '@ngui/map';
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
import { FooterComponent } from './partials/footer/footer.component';
import { ContactComponent } from './components/contact/contact.component';
import { Secrets } from './../../secrets/secrets';
let secrets = new Secrets();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent
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
    MdCardModule,
    MdInputModule,
    OwlModule,
    AngularFontAwesomeModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key='+secrets.getCredentials().maps})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
