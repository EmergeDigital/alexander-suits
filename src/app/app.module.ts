import { BrowserModule } from '@angular/platform-browser';
// import {ScrollStoreModule} from 'scrollstore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MakeEnglish } from './pipes/makeEnglish.pipe'; // import our pipe here
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Http, Headers, HttpModule, RequestOptions } from '@angular/http';
// import {AngularFontAwesomeModule} from 'angular-font-awesome/angular-font-awesome';
import { NguiMapModule } from '@ngui/map';
// import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ng2-owl-carousel';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastyModule } from 'ng2-toasty';
import { SwiperModule } from 'angular2-useful-swiper';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import 'hammerjs';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
// import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';


import { CovalentFileModule } from '@covalent/core';
import { CovalentLoadingModule } from '@covalent/core';


import { DataService } from "./services/data.service";
import { AuthService } from "./services/auth.service";
import { SessionService } from "./services/session.service";
import { FunctionsService } from "./services/functions.service";
import { SuitBuilderService } from './components/suit-builder/suit-builder.service';
import { ShirtBuilderService } from './components/shirt-builder/shirt-builder.service';
import { JacketBuilderService } from './components/jacket-builder/jacket-builder.service';
import { PantsBuilderService } from './components/pants-builder/pants-builder.service';
import { MeasurementsService } from "./services/customizers/measurements.service";

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
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { ComingSoonComponent } from './partials/coming-soon/coming-soon.component';
import { CallbackComponent } from './components/callback/callback.component';
import { NavbarSmComponent } from './partials/navbar-sm/navbar-sm.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/account/orders/orders.component';
import { SettingsComponent } from './components/account/settings/settings.component';
import { CartComponent } from './components/account/cart/cart.component';
import { CartWidgetComponent } from './components/cart-widget/cart-widget.component';
import { CheckoutMainComponent } from './components/account/checkout/checkout.component';
import { DialogContentCartDialog } from './components/cart-widget/dialog/dialog-content-cart-dialog';

// Duplicates
import { AccountMeasurementsComponent } from "./components/account/measurements/measurements.component";
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
import { PackageStitchingComponent } from './components/suit-builder/finer-details/package-stitching/package-stitching.component';
import { MeasurementsComponent } from './components/suit-builder/measurements/measurements.component';
import { BodyTypeComponent } from './components/suit-builder/measurements/body-type/body-type.component';
import { GeneralMeasurementsComponent } from './components/suit-builder/measurements/general-measurements/general-measurements.component';
import { FinerMeasurementsComponent } from './components/suit-builder/measurements/finer-measurements/finer-measurements.component';
import { UploadPhotoComponent } from './components/suit-builder/measurements/upload-photo/upload-photo.component';
import { ExtraDetailsModalComponent } from './components/suit-builder/design/extra-details-modal/extra-details-modal.component';
import { MockupGarmentModalComponent } from './components/suit-builder/utilities/mockup-garment-modal/mockup-garment-modal.component';

//Shirt-Builder --This will be moved to a seperated module (suit-builder.module)
import { ShirtBuilderComponent } from './components/shirt-builder/shirt-builder.component';
import { FabricComponent as ShirtFabricComponent } from './components/shirt-builder/fabric/fabric.component';
import { MaterialComponent as ShirtMaterialComponent } from './components/shirt-builder/fabric/material/material.component';
import { DesignComponent as ShirtDesignComponent } from './components/shirt-builder/design/design.component';
import { CollarComponent as ShirtCollarComponent } from './components/shirt-builder/design/collar/collar.component';
import { SleeveComponent } from './components/shirt-builder/design/sleeve/sleeve.component';
import { ShirtComponent } from './components/shirt-builder/design/shirt/shirt.component';
import { FinerDetailsComponent as ShirtFinerDetailsComponent } from './components/shirt-builder/finer-details/finer-details.component';
import { ButtonStylesComponent as ShirtButtonStylesComponent } from './components/shirt-builder/finer-details/button-styles/button-styles.component';
import { PackageStitchingComponent as ShirtPackageStitchingComponent } from './components/shirt-builder/finer-details/package-stitching/package-stitching.component';
import { MeasurementsComponent as ShirtMeasurementsComponent } from './components/shirt-builder/measurements/measurements.component';
import { BodyTypeComponent as ShirtBodyTypeComponent } from './components/shirt-builder/measurements/body-type/body-type.component';
import { GeneralMeasurementsComponent as ShirtGeneralMeasurementsComponent } from './components/shirt-builder/measurements/general-measurements/general-measurements.component';
import { FinerMeasurementsComponent as ShirtFinerMeasurementsComponent } from './components/shirt-builder/measurements/finer-measurements/finer-measurements.component';
import { UploadPhotoComponent as ShirtUploadPhotoComponent } from './components/shirt-builder/measurements/upload-photo/upload-photo.component';
import { ExtraDetailsModalComponent as ShirtExtraDetailsModalComponent } from './components/shirt-builder/design/extra-details-modal/extra-details-modal.component';

//Jacket-Builder --This will be moved to a seperated module (jacket-builder.module)
import { JacketBuilderComponent} from './components/jacket-builder/jacket-builder.component';
import { FabricComponent as JacketFabricComponent} from './components/jacket-builder/fabric/fabric.component';
import { MaterialComponent as JacketMaterialComponent } from './components/jacket-builder/fabric/material/material.component';
import { LiningComponent as JacketLiningComponent } from './components/jacket-builder/fabric/lining/lining.component';
import { DesignComponent as JacketDesignComponent } from './components/jacket-builder/design/design.component';
import { CollarComponent as JacketCollarComponent } from './components/jacket-builder/design/collar/collar.component';
import { PocketsComponent as JacketPocketsComponent } from './components/jacket-builder/design/pockets/pockets.component';
import { VentsComponent as JacketVentsComponent } from './components/jacket-builder/design/vents/vents.component';
import { FinerDetailsComponent as JacketFinerDetailsComponent } from './components/jacket-builder/finer-details/finer-details.component';
import { ButtonStylesComponent as JacketButtonStylesComponent } from './components/jacket-builder/finer-details/button-styles/button-styles.component';
import { PackageStitchingComponent as JacketPackageStitchingComponent } from './components/jacket-builder/finer-details/package-stitching/package-stitching.component';
import { MeasurementsComponent as JacketMeasurementsComponent } from './components/jacket-builder/measurements/measurements.component';
import { BodyTypeComponent as JacketBodyTypeComponent } from './components/jacket-builder/measurements/body-type/body-type.component';
import { GeneralMeasurementsComponent as JacketGeneralMeasurementsComponent } from './components/jacket-builder/measurements/general-measurements/general-measurements.component';
import { FinerMeasurementsComponent as JacketFinerMeasurementsComponent } from './components/jacket-builder/measurements/finer-measurements/finer-measurements.component';
import { UploadPhotoComponent as JacketUploadPhotoComponent } from './components/jacket-builder/measurements/upload-photo/upload-photo.component';
import { ExtraDetailsModalComponent as JacketExtraDetailsModalComponent } from './components/jacket-builder/design/extra-details-modal/extra-details-modal.component';

//Pants-Builder --This will be moved to a seperated module (pants-builder.module)
import { PantsBuilderComponent } from './components/pants-builder/pants-builder.component';
import { FabricComponent as PantsFabricComponent } from './components/pants-builder/fabric/fabric.component';
import { MaterialComponent as PantsMaterialComponent } from './components/pants-builder/fabric/material/material.component';
import { DesignComponent as PantsDesignComponent } from './components/pants-builder/design/design.component';
import { PantStylesComponent as PantsPantStylesComponent } from './components/pants-builder/design/pant-styles/pant-styles.component';
import { MeasurementsComponent as PantsMeasurementsComponent } from './components/pants-builder/measurements/measurements.component';
import { BodyTypeComponent as PantsBodyTypeComponent } from './components/pants-builder/measurements/body-type/body-type.component';
import { GeneralMeasurementsComponent as PantsGeneralMeasurementsComponent } from './components/pants-builder/measurements/general-measurements/general-measurements.component';
import { FinerMeasurementsComponent as PantsFinerMeasurementsComponent } from './components/pants-builder/measurements/finer-measurements/finer-measurements.component';
import { UploadPhotoComponent as PantsUploadPhotoComponent } from './components/pants-builder/measurements/upload-photo/upload-photo.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { FinalizeCartComponent } from './components/checkout/finalize-cart/finalize-cart.component';
import { DetailsComponent } from './components/checkout/details/details.component';
import { DeliveryMethodComponent } from './components/checkout/delivery-method/delivery-method.component';
import { CompleteOrderComponent } from './components/checkout/complete-order/complete-order.component';
import { PaymentMethodComponent } from './components/checkout/payment-method/payment-method.component';
import { CheckoutService } from './services/checkout.service';

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
        ExtraDetailsModalComponent,
        FinerDetailsComponent,
        MockupGarmentModalComponent,
        ButtonStylesComponent,
        PackageStitchingComponent,
        MeasurementsComponent,
        BodyTypeComponent,
        GeneralMeasurementsComponent,
        FinerMeasurementsComponent,
        UploadPhotoComponent,
        //Suit-Builder  --This will be moved to a seperated module (suit-builder.module)
        //Shirt-Builder  --This will be moved to a seperated module (shirt-builder.module)
        ShirtBuilderComponent,
        ShirtFabricComponent,
        ShirtMaterialComponent,
        ShirtDesignComponent,
        ShirtCollarComponent,
        SleeveComponent,
        ShirtComponent,
        ShirtExtraDetailsModalComponent,
        ShirtFinerDetailsComponent,
        ShirtButtonStylesComponent,
        ShirtPackageStitchingComponent,
        ShirtMeasurementsComponent,
        ShirtBodyTypeComponent,
        ShirtGeneralMeasurementsComponent,
        ShirtFinerMeasurementsComponent,
        ShirtUploadPhotoComponent,
        //Shirt-Builder  --This will be moved to a seperated module (shirt-builder.module)
        //Jacket-Builder  --This will be moved to a seperated module (jacket-builder.module)
        JacketBuilderComponent,
        JacketFabricComponent,
        JacketMaterialComponent,
        JacketLiningComponent,
        JacketDesignComponent,
        JacketCollarComponent,
        JacketPocketsComponent,
        JacketVentsComponent,
        JacketExtraDetailsModalComponent,
        JacketFinerDetailsComponent,
        JacketButtonStylesComponent,
        JacketPackageStitchingComponent,
        JacketMeasurementsComponent,
        JacketBodyTypeComponent,
        JacketGeneralMeasurementsComponent,
        JacketFinerMeasurementsComponent,
        JacketUploadPhotoComponent,
        //Jacket-Builder  --This will be moved to a seperated module (jacket-builder.module)
        //Pants-Builder  --This will be moved to a seperated module (pants-builder.module)
        PantsBuilderComponent,
        PantsFabricComponent,
        PantsMaterialComponent,
        PantsDesignComponent,
        PantsPantStylesComponent,
        PantsMeasurementsComponent,
        PantsBodyTypeComponent,
        PantsGeneralMeasurementsComponent,
        PantsFinerMeasurementsComponent,
        PantsUploadPhotoComponent,
        //Pants-Builder  --This will be moved to a seperated module (pants-builder.module)
        CheckoutComponent,
        FinalizeCartComponent,
        DetailsComponent,
        DeliveryMethodComponent,
        CompleteOrderComponent,
        PaymentMethodComponent       
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
        Ng2ImgToolsModule,
        // AngularFontAwesomeModule,
        ClipboardModule,
        SwiperModule,
        NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAm3PebcIYpXrXY5k7xA5_9JWnqIjWKlU4' })
    ],
    entryComponents: [
        DialogContentCartDialog,
        ExtraDetailsModalComponent,
        MockupGarmentModalComponent,
    ],
    providers: [DataService, SessionService, FunctionsService, AuthService, SuitBuilderService, ShirtBuilderService, JacketBuilderService, PantsBuilderService, MeasurementsService, CheckoutService,
        // {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
