import { BrowserModule } from '@angular/platform-browser';
import { ScrollStoreModule } from 'scrollstore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdSnackBarModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
 import { NguiMapModule} from '@ngui/map';
// import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ng2-owl-carousel';
import { ClipboardModule } from 'ngx-clipboard';
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
import { AboutComponent } from './components/about/about.component';
import { SuitsComponent } from './components/suits/suits.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { ComingSoonComponent } from './partials/coming-soon/coming-soon.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    SuitsComponent,
    AccessoriesComponent,
    PrivacyComponent,
    TermsAndConditionsComponent,
    DisclaimerComponent,
    ComingSoonComponent
  ],
  imports: [
    ScrollStoreModule,
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
    MdSnackBarModule,
    OwlModule,
    AngularFontAwesomeModule,
    ClipboardModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAm3PebcIYpXrXY5k7xA5_9JWnqIjWKlU4'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
