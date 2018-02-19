import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-collar',
  templateUrl: './collar.component.html',
  styleUrls: ['./collar.component.scss']
})
export class CollarComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private DesignStage = DesignStage;

  private collarsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v1.png"},
    {"name": "2", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v2.png"},
    {"name": "3", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v3.png"},
    {"name": "4", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v4.png"},
    {"name": "5", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v5.png"},
    {"name": "6", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v6.png"},
    {"name": "7", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v7.png"},
    {"name": "8", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v8.png"},
    {"name": "9", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v11.png"},
  ];

  private selectedCollar: any = {};
  private isSelectedCollar: boolean = false;  

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.selectedCollar = this.suitBuilderService.suit.collar;
    this.isSelectedCollar = this.suitBuilderService.isCollarSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectCollar(collar: any) {
    this.selectedCollar = collar;
    this.isSelectedCollar = true;
  }

  private Previous(): void {
    this.suitBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  private Next(): void {
      this.suitBuilderService.suit.collar = this.selectedCollar;
      this.suitBuilderService.isCollarSelected = this.isSelectedCollar;
      this.suitBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }
}
