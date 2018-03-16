import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-pockets',
  templateUrl: './pockets.component.html',
  styleUrls: ['./pockets.component.scss']
})
export class PocketsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  private DesignStage = DesignStage;

  private pocketsMock: any[] = [
    { "name": "Straight", "desc": "A straight flap pocket style.", "url": "assets/suit-builder/pockets/pocket-v4.png" },
    { "name": "Straight", "desc": "A straight flap pocket with ticket pocket style.", "url": "assets/suit-builder/pockets/pocket-v5.png" },
    { "name": "Patch", "desc": "A straight patch pocket style.", "url": "assets/suit-builder/pockets/pocket-v1.png" },
    { "name": "Slanted", "desc": "A slanted flap pocket style.", "url": "assets/suit-builder/pockets/pocket-v2.png" },
    { "name": "Slanted", "desc": "A slanted flap pocket with ticket pocket style.", "url": "assets/suit-builder/pockets/pocket-v3.png" },
  ];

  private selectedPocket: any = {};
  private isSelectedPocket: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.selectedPocket = this.suitBuilderService.suit.pockets;
    this.isSelectedPocket = this.suitBuilderService.isPocketsSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private GetBackgroundSelected(): string {
    var ret = "";

    if (this.suitBuilderService.isCollarSelected)
      ret = 'url(' + this.currentSuit.collar.url + '),';

    if (this.isSelectedPocket)
      ret = ret + ' url(' + this.selectedPocket.url + '),';
      
    return ret + ' url("assets/suit-builder/suit-base.png")';
  }

  private SelectPocket(pocket: any) {
    this.selectedPocket = pocket;
    this.isSelectedPocket = true;
  }

  private Previous(): void {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Collar);
  }

  private Next(): void {
    this.suitBuilderService.suit.pockets = this.selectedPocket;
    this.suitBuilderService.isPocketsSelected = this.isSelectedPocket;
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Vents);
  }
}
