import { Component, OnInit } from '@angular/core';
import { FinerDetailsStage } from '../../../../models/suit-builder/finerDetailsStage';
import { SuitBuilderService } from '../../suit-builder.service';

@Component({
  selector: 'suit-builder-finer-details-waistcoat',
  templateUrl: './waistcoat.component.html',
  styleUrls: ['./waistcoat.component.scss']
})
export class WaistcoatComponent implements OnInit {

    constructor(private suitBuilderService: SuitBuilderService) { }

    public ngOnInit(): void {

    }

    private Previous() {
      this.suitBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.ButtonStyles);
    }
  
    private Next() {
      this.suitBuilderService.SetFinerDetailsStage.emit(FinerDetailsStage.PackageStitching);
    }
}
