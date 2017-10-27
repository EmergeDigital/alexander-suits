import { Component, OnInit } from '@angular/core';
import {SuitService} from "./../../../../services/customizers/suit.service";
import {TabsService} from '../../../../services/tabs.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  constructor(public suitService: SuitService, public service: TabsService) { 
    
  }

  ngOnInit() {
  }

  selectType(type) {
    this.suitService.setCollection(type);
    this.service.selectType = false;
    this.service.selectFabric = true;
  }

}
