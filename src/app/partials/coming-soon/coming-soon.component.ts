import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  @Input('pageTitle') pageTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
