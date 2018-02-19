import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';

@Component({
  selector: 'suit-builder-measurements-body-type',
  templateUrl: './body-type.component.html',
  styleUrls: ['./body-type.component.scss']
})
export class BodyTypeComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private MeasurementStage = MeasurementStage;

  private bodyTypesMock: any[] = [
    {"name": "1", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/pants/pants-v1.png"},
    {"name": "2", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/pants/pants-v2.png"},
    {"name": "3", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/pants/pants-v3.png"},
  ];
  
  private selectedBodyType: any = {};
  private isSelectedBodyType: boolean = false;

  private currentSuit: any = {};

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.selectedBodyType = this.suitBuilderService.suit.bodyType;
    
    this.isSelectedBodyType = this.suitBuilderService.isBodyTypeSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectBodyType(bodyType: any) {
    this.selectedBodyType = bodyType;
    this.isSelectedBodyType = true;
  }

  private Previous(): void {
    this.suitBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
  }

  private Next(): void {
    this.suitBuilderService.suit.bodyType = this.selectedBodyType;
    
    this.suitBuilderService.isBodyTypeSelected = this.isSelectedBodyType;

    this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.GeneralMeasurements);
  }
}
