import { Component, OnInit } from '@angular/core';
import {TabsService} from '../../../services/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  page: string;
  pages: any[];

  constructor(private service: TabsService) {
    this.pages = service.getTabs();
   }

  ngOnInit() {
  }

  changePage(page){
    let pages = this.pages;
    for (let p in pages){
      if(pages[p].name == page){
        pages[p].isSelected = true;
        pages[p].isVisited = true;
      } else {
        pages[p].isSelected = false;
      }
    }
    pages = this.pages;
    this.service.changedTab(pages);
  }

  changeOnlyPage(page){
    this.service.changeTab(page);
    this.pages = this.service.getTabs();
  }


}
