import { Component, OnInit } from '@angular/core';
import { JacketBuilderService } from '../jacket-builder.service';
import { FabricStage } from '../../../models/jacket-builder/fabricStage';

@Component({
  selector: 'jacket-builder-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  private FabricStage = FabricStage; // Html Reference

  private currentFabricStage: FabricStage = FabricStage.Material;

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentFabricStage = this.jacketBuilderService.FabricStage;
    this.jacketBuilderService.SetFabricStage.subscribe((fabricStage: FabricStage) => this.currentFabricStage = fabricStage);
  }

}
