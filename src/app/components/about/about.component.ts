import { Component, OnInit } from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public snackBar: MdSnackBar) { }

  ngOnInit() {
  }
  
  doesNothing() {
    this.snackBar.open("This does nothing at the moment!", "", {  duration: 2000   });
  }
}
