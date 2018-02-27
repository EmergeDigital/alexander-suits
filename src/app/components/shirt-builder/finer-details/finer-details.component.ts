import { Component, OnInit } from '@angular/core';
import { ShirtBuilderService } from '../shirt-builder.service';
import { FinerDetailsStage } from '../../../models/shirt-builder/finerDetailsStage';

@Component({
  selector: 'shirt-builder-finer-details',
  templateUrl: './finer-details.component.html',
  styleUrls: ['./finer-details.component.scss']
})
export class FinerDetailsComponent implements OnInit {
  private FinerDetailsStage = FinerDetailsStage; //Html Reference

  private currentFinerDetailsStage: FinerDetailsStage = FinerDetailsStage.ButtonStyles;

  constructor(private shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentFinerDetailsStage = this.shirtBuilderService.FinerDetailsStage;
    this.shirtBuilderService.SetFinerDetailsStage.subscribe((finerDetailsStage: FinerDetailsStage) => this.currentFinerDetailsStage = finerDetailsStage);
  }

}
