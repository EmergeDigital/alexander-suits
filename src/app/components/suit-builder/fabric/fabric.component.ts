import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../suit-builder.service';
import { FabricStage } from '../../../models/suit-builder/fabricStage';

@Component({
  selector: 'suit-builder-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  private FabricStage = FabricStage; // Html Reference

  private currentFabricStage: FabricStage = FabricStage.Material;

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.suitBuilderService.SetFabricStage.subscribe((fabricStage: FabricStage) => this.currentFabricStage = fabricStage);
  }

}
