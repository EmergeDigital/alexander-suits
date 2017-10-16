import {BrowserModule} from '@angular/platform-browser';
import {ScrollStoreModule} from 'scrollstore';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MakeEnglish } from './pipes/makeEnglish.pipe'; // import our pipe here
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatMenuModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material';
import {MatSelectModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material';
import {MatSortModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {Http, Headers, HttpModule, RequestOptions} from '@angular/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome/angular-font-awesome';
import {NguiMapModule} from '@ngui/map';
// import { RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {OwlModule} from 'ng2-owl-carousel';
import {ClipboardModule} from 'ngx-clipboard';
import {ToastyModule} from 'ng2-toasty';
import { SwiperModule } from 'angular2-useful-swiper';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import 'hammerjs';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';


import {TabsService} from "./services/tabs.service";
import {DataService} from "./services/data.service";
import {AuthService} from "./services/auth.service";
import {SessionService} from "./services/session.service";
import {FunctionsService} from "./services/functions.service";

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
import {CallbackComponent} from './components/callback/callback.component';
import {NavbarSmComponent} from './partials/navbar-sm/navbar-sm.component';
import {AccountComponent} from './components/account/account.component';
import {OrdersComponent} from './components/account/orders/orders.component';
import {SettingsComponent} from './components/account/settings/settings.component';
import {CartComponent} from './components/account/cart/cart.component';
import {CartWidgetComponent} from './components/cart-widget/cart-widget.component';
import {CheckoutMainComponent} from './components/account/checkout/checkout.component';
import {DialogContentCartDialog} from './components/cart-widget/dialog/dialog-content-cart-dialog';

// Duplicates
import {AccountMeasurementsComponent} from "./components/account/measurements/measurements.component";
import { PaymentComponent } from './components/payment/payment.component';
import { ExtrasComponent } from './components/suit-builder/extras/extras.component';
import { ExtrasInnerComponent } from './components/suit-builder/extras/extras-inner/extras-inner.component';
import { OrderComponent } from './components/account/order/order.component';

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
        CartComponent,
        CartWidgetComponent,
        CheckoutMainComponent,
        DialogContentCartDialog,
        AccountMeasurementsComponent,
        PaymentComponent,
        ExtrasComponent,
        ExtrasInnerComponent,
        MakeEnglish,
        OrderComponent
    ],
    imports: [
        ScrollStoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        ToastyModule.forRoot(),
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatInputModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatDialogModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatSortModule,
        MatTableModule,
        OwlModule,
        AngularFontAwesomeModule,
        ClipboardModule,
        SwiperModule,
        Ng2PageScrollModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAm3PebcIYpXrXY5k7xA5_9JWnqIjWKlU4'})
    ],
    entryComponents: [
        DialogContentCartDialog
    ],
    providers: [TabsService, DataService, SessionService, FunctionsService, AuthService,
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
