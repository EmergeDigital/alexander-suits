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

  private DesignStage = DesignStage;

  private pocketsMock: any[] = [
    { "name": "1", "desc": "Pocket Description", "url": "assets/jacket-builder/pockets/pocket-v1.png" },
    { "name": "2", "desc": "Pocket Description", "url": "assets/jacket-builder/pockets/pocket-v2.png" },
    { "name": "3", "desc": "Pocket Description", "url": "assets/jacket-builder/pockets/pocket-v3.png" },
    { "name": "4", "desc": "Pocket Description", "url": "assets/jacket-builder/pockets/pocket-v4.png" },
    { "name": "5", "desc": "Pocket Description", "url": "assets/jacket-builder/pockets/pocket-v5.png" },
  ];

  private selectedPocket: any = {};
  private isSelectedPocket: boolean = false;

  private currentSuit: any = {};

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.jacketBuilderService.suit;
    this.selectedPocket = this.jacketBuilderService.suit.pockets;
    this.isSelectedPocket = this.jacketBuilderService.isPocketsSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectPocket(pocket: any) {
    this.selectedPocket = pocket;
    this.isSelectedPocket = true;
  }

  private Previous(): void {
    this.jacketBuilderService.SetDesignStage.emit(DesignStage.Collar);
  }

  private Next(): void {
    this.jacketBuilderService.suit.pockets = this.selectedPocket;
    this.jacketBuilderService.isPocketsSelected = this.isSelectedPocket;
    this.jacketBuilderService.SetDesignStage.emit(DesignStage.Vents);
  }
}
