import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class TabsService {

  tabs: any[];
  public selectType: boolean = true;
  public selectFabric: boolean = false;

  tabs_event: EventEmitter<any[]> = new EventEmitter();
  constructor() {
    this.tabs = [
      {
        name: "fabric",
        isSelected: true,
        isVisited: true
      },
      {
        name: "customize",
        isSelected: false,
        isVisited: false
      },
      {
        name: "extras",
        isSelected: false,
        isVisited: false
      },
      {
        name: "measurements",
        isSelected: false,
        isVisited: false
      }
    ];
  }

  changedTab(tabs){
    this.tabs = tabs;
    this.tabs_event.emit(this.tabs);
  }

  getTabs(){
    return this.tabs;
  }

  setTabs(tabs){
    this.tabs = tabs;
  }

  changeTab(tab){
    let tabs = this.tabs;
    for (let t in tabs){
      if(tabs[t].name == tab){
        tabs[t].isSelected = true;
        tabs[t].isVisited = true;
      } else {
        tabs[t].isSelected = false;
        tabs[t].isVisited = false;
      }
    }
    this.tabs = tabs;
  }

}
