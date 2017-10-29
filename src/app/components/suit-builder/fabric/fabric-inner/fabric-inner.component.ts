import { Component, OnInit } from '@angular/core';
import {TabsService} from '../../../../services/tabs.service';

@Component({
  selector: 'app-fabric-inner',
  templateUrl: './fabric-inner.component.html',
  styleUrls: ['./fabric-inner.component.scss']
})
export class FabricInnerComponent implements OnInit {

  selectFabric: boolean;
  selectType: boolean;

  constructor(public service: TabsService) {
    this.selectType = service.selectType;
    this.selectFabric = service.selectFabric;
  }

  ngOnInit() {
  }

  nextSection() {
    if(this.service.selectType){
      this.service.selectType = false;
      this.service.selectFabric = true;
    } else {
      this.service.changeTab("customize");
    }
  }

  prevSection() {
    if(this.service.selectFabric){
      this.service.selectType = true;
      this.service.selectFabric = false;
    }
  }

}
