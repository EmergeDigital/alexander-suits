import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../suit-builder.service';
import { FabricStage } from '../../../models/suit-builder/fabricStage';

@Component({
  selector: 'suit-builder-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  public FabricStage = FabricStage; // Html Reference

  public currentFabricStage: FabricStage = FabricStage.Material;

  constructor(public suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentFabricStage = this.suitBuilderService.FabricStage;
    this.suitBuilderService.SetFabricStage.subscribe((fabricStage: FabricStage) => this.currentFabricStage = fabricStage);
  }

}
