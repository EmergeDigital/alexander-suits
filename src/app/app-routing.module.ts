import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { SuitsComponent } from './components/suits/suits.component';
import { AccessoriesComponent } from './components/accessories/accessories.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { SuitBuilderComponent } from './components/suit-builder/suit-builder.component';
import { CallbackComponent } from './components/callback/callback.component';


const routes: Routes = [
    {
        // Default path
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'suits',
        component: SuitBuilderComponent
    },
    {
        path: 'accessories',
        component: AccessoriesComponent
    },
    {
        path: 'privacy',
        component: PrivacyComponent
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: 'disclaimer',
        component: DisclaimerComponent
    },
    {
        path: 'callback',
        component: CallbackComponent
    }

];

// // Use hash in location routes, for hosting on heroku
// const routeSettings = {
//     useHash: true
// };

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [ RouterModule ]
})



export class AppRoutingModule { }
