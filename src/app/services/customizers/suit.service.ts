import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class SuitService {

  public collection: string = '';
  public product: any;
  _collectionChanged: EventEmitter<string> = new EventEmitter();
  public suit: any = {
    collar: {"name": "1", "url": "assets/suit-builder/collars/collar-v1.png"},
    pockets: {"name": "1", "url": "assets/suit-builder/pockets/pocket-v1.png"},
    buttons: {"name": "1", "desc": "Fake button holes", "url": "assets/suit-builder/buttons/buttons-v1.png"},
    tongue: {"name": "1", "desc": "Tongue facing integrated", "url": "assets/suit-builder/tongue/tongue-v1.png"},
    vents: {"name": "1", "url": "assets/suit-builder/vents/vents-v1.png"},
    pants: {"name": "1", "url": "assets/suit-builder/pants/pants-v1.png"},
    waistcoat: false,
    coat: false,
    buttonHoles: {"name": 0, "value": "Default", "color": "Default"},
    contrastPackage: {"name": "0", "value": "None", "color": null},
    mockup: false,
    oversize: false
  };

  constructor() { }

  setCollection(collection) {
    this.collection = collection;
    console.log("QUE");
    this._collectionChanged.emit(collection);
  }

}