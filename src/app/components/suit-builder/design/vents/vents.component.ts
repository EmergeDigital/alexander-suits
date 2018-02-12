import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-vents',
  templateUrl: './vents.component.html',
  styleUrls: ['./vents.component.scss']
})
export class VentsComponent implements OnInit {
  private ventsMock: any[] = [
    {"name": "1", "desc": "Vent Description", "price": "200", "url": "assets/suit-builder/vents/vents-v1.png"},
    {"name": "2", "desc": "Vent Description", "price": "200", "url": "assets/suit-builder/vents/vents-v2.png"},
  ];

  private errorMessage: string = "";

  private selectedVent: any = {};
  private isSelectedVent: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
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
    this.suitBuilderService.SetDesignStage.emit(DesignStage.PantStyles);
  }
}
