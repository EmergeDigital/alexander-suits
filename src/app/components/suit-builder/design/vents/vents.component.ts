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
  
  private DesignStage = DesignStage;

  private ventsMock: any[] = [
    {"name": "NAME", "desc": "Vent Description", "price": "200", "url": "assets/suit-builder/vents/vents-v1.png"},
    {"name": "NAME", "desc": "Vent Description", "price": "200", "url": "assets/suit-builder/vents/vents-v2.png"},
  ];

  private errorMessage: string = "";

  private selectedVent: any = {};
  private isSelectedVent: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.selectedVent = this.suitBuilderService.suit.vents;
    this.isSelectedVent = this.suitBuilderService.isVentsSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectVent(vent: any) {
    this.selectedVent = vent;
    this.isSelectedVent = true;
  }

  private Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }

  private Next() {
    this.suitBuilderService.suit.vents = this.selectedVent;
    this.suitBuilderService.isVentsSelected = this.isSelectedVent;
    this.suitBuilderService.SetDesignStage.emit(DesignStage.PantStyles);
  }
}
