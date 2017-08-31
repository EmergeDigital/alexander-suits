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

  constructor(private service: TabsService) {
    this.selectType = true;
    this.selectFabric = false;
  }

  ngOnInit() {
  }

  nextSection() {
    if(this.selectType){
      this.selectType = false;
      this.selectFabric = true;
    } else {
      this.service.changeTab("customize");
    }
  }

  prevSection() {
    if(this.selectFabric){
      this.selectType = true;
      this.selectFabric = false;
    }
  }

}
