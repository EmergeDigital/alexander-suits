import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { DesignStage } from '../../../../models/jacket-builder/designStage';

@Component({
  selector: 'jacket-builder-design-pockets',
  templateUrl: './pockets.component.html',
  styleUrls: ['./pockets.component.scss']
})
export class PocketsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public DesignStage = DesignStage;

  public pocketsMock: any[] = [
    { "name": "Straight", "desc": "A straight flap pocket style.", "url": "assets/suit-builder/pockets/pocket-v4.png" },
    { "name": "Straight", "desc": "A straight flap pocket with ticket pocket style.", "url": "assets/suit-builder/pockets/pocket-v5.png" },
    { "name": "Patch", "desc": "A straight patch pocket style.", "url": "assets/suit-builder/pockets/pocket-v1.png" },
    { "name": "Slanted", "desc": "A slanted flap pocket style.", "url": "assets/suit-builder/pockets/pocket-v2.png" },
    { "name": "Slanted", "desc": "A slanted flap pocket with ticket pocket style.", "url": "assets/suit-builder/pockets/pocket-v3.png" },
  ];

  public selectedPocket: any = {};
  public isSelectedPocket: boolean = false;

  public currentSuit: any = {};

  constructor(public jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.selectedPocket = this.jacketBuilderService.suit.pockets;
    this.isSelectedPocket = this.jacketBuilderService.isPocketsSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public GetBackgroundSelected(): string {
    var ret = "";

    if (this.jacketBuilderService.isCollarSelected)
      ret = 'url(' + this.currentSuit.collar.url + '),';

    if (this.isSelectedPocket)
      ret = ret + ' url(' + this.selectedPocket.url + '),';

    return ret + ' url("assets/suit-builder/suit-base.png")';
  }

  public SelectPocket(pocket: any) {
    this.selectedPocket = pocket;
    this.isSelectedPocket = true;
  }

  public Previous(): void {
    this.jacketBuilderService.SetDesignStage.emit(DesignStage.Collar);
  }

  public Next(): void {
    this.jacketBuilderService.suit.pockets = this.selectedPocket;
    this.jacketBuilderService.isPocketsSelected = this.isSelectedPocket;
    this.jacketBuilderService.SetDesignStage.emit(DesignStage.Vents);
  }
}
