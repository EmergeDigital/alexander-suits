import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input('appTitle') appTitle: string;

  constructor() {
      if (this.appTitle === undefined) {
          this.appTitle = 'Unspecified';
      }
  }

  ngOnInit() {
  }

}
