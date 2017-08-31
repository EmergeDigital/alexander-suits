import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-fabric',
  templateUrl: './select-fabric.component.html',
  styleUrls: ['./select-fabric.component.scss']
})
export class SelectFabricComponent implements OnInit {
  items: any[];


  constructor() {
    this.items = [
      {
        color: '#213'
      },
      {
        color: '#412'
      },
      {
        color: '#afd'
      },
      {
        color: '#e43'
      },
      {
        color: '#aaf'
      },
      {
        color: '#ace'
      },
      {
        color: '#dfe'
      },
      {
        color: '#223'
      },
      {
        color: '#1ac'
      },
      {
        color: '#e7c'
      },
      {
        color: '#f2f'
      },
      {
        color: '#0f2'
      }
    ]
  }

  ngOnInit() {
  }

  getStyle(item){
    return "background-color: " + item.color;
  }

}
