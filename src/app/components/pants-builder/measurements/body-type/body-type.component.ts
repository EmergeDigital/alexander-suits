import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { MeasurementStage } from '../../../../models/pants-builder/measurementsStage';
import { WizardStage } from '../../../../models/pants-builder/wizardStage';

@Component({
  selector: 'pants-builder-measurements-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.scss']
})
export class BodyTypeComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private MeasurementStage = MeasurementStage;

  private bodyTypesMock: any[] = [
    {"name": "1", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "price": "200", "url": "assets/pants-builder/pants/pants-v3.png"},
  ];
  
  private selectedBodyType: any = {};
  private isSelectedBodyType: boolean = false;

  private currentSuit: any = {};

  constructor(private pantsBuilderService: PantsBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.selectedBodyType = this.pantsBuilderService.suit.bodyType;
    
    this.isSelectedBodyType = this.pantsBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  private Previous(): void {
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Design);
  }

  private Next(): void {
    this.pantsBuilderService.suit.bodyType = this.selectedBodyType;
    
    this.pantsBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
