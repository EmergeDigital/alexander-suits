import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input('appTitle') appTitle: string;

    constructor() {
        if (this.appTitle === undefined) {
            this.appTitle = 'Unspecified';
        }
    }

    ngOnInit() {

    }

}
