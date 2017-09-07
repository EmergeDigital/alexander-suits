import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-content-cart-dialog',
  templateUrl: './dialog-content-cart-dialog.html',
  styleUrls: ['./dialog-content-cart-dialog.scss']
})
export class DialogContentCartDialog implements OnInit {

  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}
