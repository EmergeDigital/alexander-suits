import { Component, OnInit } from '@angular/core';
import { JacketBuilderService } from '../jacket-builder.service';
import { FinerDetailsStage } from '../../../models/jacket-builder/finerDetailsStage';

@Component({
  selector: 'jacket-builder-finer-details',
  templateUrl: './finer-details.component.html',
  styleUrls: ['./finer-details.component.scss']
})
export class FinerDetailsComponent implements OnInit {
  public FinerDetailsStage = FinerDetailsStage; //Html Reference

  public currentFinerDetailsStage: FinerDetailsStage = FinerDetailsStage.ButtonStyles;

  constructor(public jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentFinerDetailsStage = this.jacketBuilderService.FinerDetailsStage;
    this.jacketBuilderService.SetFinerDetailsStage.subscribe((finerDetailsStage: FinerDetailsStage) => this.currentFinerDetailsStage = finerDetailsStage);
  }

}
