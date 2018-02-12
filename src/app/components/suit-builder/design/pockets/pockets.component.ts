import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-pockets',
  templateUrl: './pockets.component.html',
  styleUrls: ['./pockets.component.scss']
})
export class PocketsComponent implements OnInit {  
  private pocketsMock: any[] = [
    {"name": "1", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pockets/pocket-v1.png"},
    {"name": "2", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pockets/pocket-v2.png"},
    {"name": "3", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pockets/pocket-v3.png"},
    {"name": "4", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pockets/pocket-v4.png"},
    {"name": "5", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pockets/pocket-v5.png"},
  ];

  private errorMessage: string = "";

  private selectedPocket: any = {};
  private isSelectedPocket: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
  }

  private SelectPocket(pocket: any) {
    this.selectedPocket = pocket;
    this.isSelectedPocket = true;
  }

  private Previous(): void {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Collar);
  }

  private Next(): void {
    if(this.isSelectedPocket) {
      this.suitBuilderService.suit.pockets = this.selectedPocket;
      this.suitBuilderService.SetDesignStage.emit(DesignStage.Vents);
    }
    else {
      this.errorMessage = "Please Select A Pocket";
    }
  }
}
