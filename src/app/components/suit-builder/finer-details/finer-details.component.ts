import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../suit-builder.service';
import { FinerDetailsStage } from '../../../models/suit-builder/finerDetailsStage';

@Component({
  selector: 'suit-builder-finer-details',
  templateUrl: './finer-details.component.html',
  styleUrls: ['./finer-details.component.scss']
})
export class FinerDetailsComponent implements OnInit {
  private FinerDetailsStage = FinerDetailsStage; //Html Reference

  private currentFinerDetailsStage: FinerDetailsStage = FinerDetailsStage.ButtonStyles;

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.suitBuilderService.SetFinerDetailsStage.subscribe((finerDetailsStage: FinerDetailsStage) => this.currentFinerDetailsStage = finerDetailsStage);
  }

}
