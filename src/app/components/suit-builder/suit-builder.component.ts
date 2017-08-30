import { Component, OnInit } from '@angular/core';
import {TabsService} from '../../services/tabs.service';

@Component({
  selector: 'app-suit-builder',
  templateUrl: './suit-builder.component.html',
  styleUrls: ['./suit-builder.component.scss']
})
export class SuitBuilderComponent implements OnInit {
  tabs: any[];

  constructor(private service: TabsService) {
    this.tabs = service.getTabs();
    service.tabs_event.subscribe(
          (new_tabs) => {
            // console.log(new_tabs);
            this.changeTab(new_tabs);

          }
       );

  }

  ngOnInit() {
  }

  changeTab(new_tabs){
    // for(let tab of new_tabs){
    //   if(tab.isSelected === true ){
    //     this.changeTab(tab.name);
    //   }
    // }
    this.tabs = new_tabs;
  }


}
