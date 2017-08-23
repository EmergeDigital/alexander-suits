import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input('appTitle') appTitle: string;
    cell: string;

    constructor(public snackBar: MdSnackBar) {
        if (this.appTitle === undefined) {
            this.appTitle = 'Unspecified';
        }
        this.cell = "011 492 33604";
    }

    ngOnInit() {

    }

    copied() {
      this.snackBar.open("Copied to clipboard!", "", {  duration: 2000   });
    }

}
