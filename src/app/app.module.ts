import {BrowserModule} from '@angular/platform-browser';
import {ScrollStoreModule} from 'scrollstore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import {MdMenuModule} from '@angular/material';
import {MdCardModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdSnackBarModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import {MdGridListModule} from '@angular/material';
import {MdProgressSpinnerModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {Http, Headers, HttpModule, RequestOptions} from '@angular/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome/angular-font-awesome';
import {NguiMapModule} from '@ngui/map';
// import { RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {OwlModule} from 'ng2-owl-carousel';
import {ClipboardModule} from 'ngx-clipboard';
import {ToastyModule} from 'ng2-toasty';
import {DataService} from "./services/data.service";
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import 'hammerjs';

import {TabsService} from "./services/tabs.service";
import {AuthService} from "./services/auth.service";

/*============================================================================
 Route Imports
 ============================================================================*/
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './partials/navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './partials/footer/footer.component';
import {ContactComponent} from './components/contact/contact.component';
import {AboutComponent} from './components/about/about.component';
import {SuitsComponent} from './components/suits/suits.component';
import {AccessoriesComponent} from './components/accessories/accessories.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {DisclaimerComponent} from './components/disclaimer/disclaimer.component';
import {ComingSoonComponent} from './partials/coming-soon/coming-soon.component';
import {FabricComponent} from './components/suit-builder/fabric/fabric.component';
import {TypeComponent} from './components/suit-builder/fabric/type/type.component';
import {TabsComponent} from './components/suit-builder/tabs/tabs.component';
import {SuitBuilderComponent} from './components/suit-builder/suit-builder.component';
import {SelectFabricComponent} from './components/suit-builder/fabric/select-fabric/select-fabric.component';
import {CustomizeComponent} from './components/suit-builder/customize/customize.component';
import {CustomizeInnerComponent} from './components/suit-builder/customize/customize-inner/customize-inner.component';
import {FabricInnerComponent} from './components/suit-builder/fabric/fabric-inner/fabric-inner.component';
import {MeasurementsComponent} from './components/suit-builder/measurements/measurements.component';
import {MeasurementsInnerComponent} from './components/suit-builder/measurements/measurements-inner/measurements-inner.component';
import {CheckoutComponent} from './components/suit-builder/checkout/checkout.component';
import {CheckoutInnerComponent} from './components/suit-builder/checkout/checkout-inner/checkout-inner.component';
import { CallbackComponent } from './components/callback/callback.component';
import { NavbarSmComponent } from './partials/navbar-sm/navbar-sm.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { SettingsComponent } from './components/account/settings/settings.component';
import { CartComponent } from './components/account/cart/cart.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}


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
        ComingSoonComponent,
        FabricComponent,
        TypeComponent,
        TabsComponent,
        SuitBuilderComponent,
        SelectFabricComponent,
        CustomizeComponent,
        CustomizeInnerComponent,
        FabricInnerComponent,
        MeasurementsComponent,
        MeasurementsInnerComponent,
        CheckoutComponent,
        CheckoutInnerComponent,
        CallbackComponent,
        NavbarSmComponent,
        AccountComponent,
        OrdersComponent,
        SettingsComponent,
        CartComponent
    ],
    imports: [
        ScrollStoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ToastyModule.forRoot(),
        MdButtonModule,
        MdCheckboxModule,
        MdToolbarModule,
        MdIconModule,
        MdMenuModule,
        MdCardModule,
        MdInputModule,
        MdSnackBarModule,
        MdSidenavModule,
        MdGridListModule,
        MdProgressSpinnerModule,
        OwlModule,
        AngularFontAwesomeModule,
        ClipboardModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAm3PebcIYpXrXY5k7xA5_9JWnqIjWKlU4'})
    ],
    providers: [TabsService, DataService, AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
