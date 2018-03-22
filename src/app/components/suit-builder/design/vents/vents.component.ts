import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-vents',
  templateUrl: './vents.component.html',
  styleUrls: ['./vents.component.scss']
})
export class VentsComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  public DesignStage = DesignStage;

  public ventsMock: any[] = [
    {"name": "Centre", "desc": "A centre vent style.", "url": "assets/suit-builder/vents/vents-v1.png"},
    {"name": "Side", "desc": "A side vent style.", "url": "assets/suit-builder/vents/vents-v2.png"},
  ];

  public errorMessage: string = "";

  public selectedVent: any = {};
  public isSelectedVent: boolean = false;

  public currentSuit: any = {};

  constructor(public suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.selectedVent = this.suitBuilderService.suit.vents;
    this.isSelectedVent = this.suitBuilderService.isVentsSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectVent(vent: any) {
    this.selectedVent = vent;
    this.isSelectedVent = true;
  }

  public Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }

  public Next() {
    this.suitBuilderService.suit.vents = this.selectedVent;
    this.suitBuilderService.isVentsSelected = this.isSelectedVent;
    this.suitBuilderService.SetDesignStage.emit(DesignStage.PantStyles);
  }
}
