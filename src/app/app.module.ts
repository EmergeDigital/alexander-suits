import {BrowserModule} from '@angular/platform-browser';
// import {ScrollStoreModule} from 'scrollstore';
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
// import {AngularFontAwesomeModule} from 'angular-font-awesome/angular-font-awesome';
import {NguiMapModule} from '@ngui/map';
// import { RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {OwlModule} from 'ng2-owl-carousel';
import {ClipboardModule} from 'ngx-clipboard';
import {ToastyModule} from 'ng2-toasty';
import { SwiperModule } from 'angular2-useful-swiper';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import 'hammerjs';
import {NgxPageScrollModule} from 'ngx-page-scroll';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
// import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';


import { CovalentFileModule } from '@covalent/core';
import { CovalentLoadingModule } from '@covalent/core';


import {TabsService} from "./services/tabs.service";
import {DataService} from "./services/data.service";
import {AuthService} from "./services/auth.service";
import {SessionService} from "./services/session.service";
import {FunctionsService} from "./services/functions.service";
import {SuitService} from "./services/customizers/suit.service";
import { SuitBuilderService } from './components/suit-builder/suit-builder.service';
import {MeasurementsService} from "./services/customizers/measurements.service";

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
import { OrderComponent } from './components/account/order/order.component';

//Suit-Builder --This will be moved to a seperated module (suit-builder.module)
import { SuitBuilderComponent } from './components/suit-builder/suit-builder.component';
import { FabricComponent } from './components/suit-builder/fabric/fabric.component';
import { MaterialComponent } from './components/suit-builder/fabric/material/material.component';
import { LiningComponent } from './components/suit-builder/fabric/lining/lining.component';
import { DesignComponent } from './components/suit-builder/design/design.component';
import { CollarComponent } from './components/suit-builder/design/collar/collar.component';
import { PocketsComponent } from './components/suit-builder/design/pockets/pockets.component';
import { VentsComponent } from './components/suit-builder/design/vents/vents.component';
import { PantStylesComponent } from './components/suit-builder/design/pant-styles/pant-styles.component';
import { AddonsComponent } from './components/suit-builder/design/addons/addons.component';
import { FinerDetailsComponent } from './components/suit-builder/finer-details/finer-details.component';
import { ButtonStylesComponent } from './components/suit-builder/finer-details/button-styles/button-styles.component';
import { WaistcoatComponent } from './components/suit-builder/finer-details/waistcoat/waistcoat.component';
import { PackageStitchingComponent } from './components/suit-builder/finer-details/package-stitching/package-stitching.component';
import { MeasurementsComponent } from './components/suit-builder/measurements/measurements.component';

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
        MakeEnglish,
        OrderComponent,
        //Suit-Builder  --This will be moved to a seperated module (suit-builder.module)
        SuitBuilderComponent,
        FabricComponent,
        MaterialComponent,
        LiningComponent,
        DesignComponent,
        CollarComponent,
        PocketsComponent,
        VentsComponent,
        PantStylesComponent,
        AddonsComponent,
        FinerDetailsComponent,
        ButtonStylesComponent,
        WaistcoatComponent,
        PackageStitchingComponent,
        MeasurementsComponent
    ],
    imports: [
        // ScrollStoreModule,
        NgxPageScrollModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CovalentFileModule,
        CovalentLoadingModule,
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
        ScrollToModule.forRoot(),
        // AngularFontAwesomeModule,
        ClipboardModule,
        SwiperModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAm3PebcIYpXrXY5k7xA5_9JWnqIjWKlU4'})
    ],
    entryComponents: [
        DialogContentCartDialog
    ],
    providers: [TabsService, DataService, SessionService, FunctionsService, AuthService, SuitService, SuitBuilderService, MeasurementsService,
        // {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
