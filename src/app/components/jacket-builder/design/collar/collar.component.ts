import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';
import { DesignStage } from '../../../../models/jacket-builder/designStage';

@Component({
  selector: 'jacket-builder-design-collar',
  templateUrl: './collar.component.html',
  styleUrls: ['./collar.component.scss']
})
export class CollarComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private DesignStage = DesignStage;

  private collarsMock: any[] = [
    {"name": "1", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v1.png"},
    {"name": "2", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v2.png"},
    {"name": "3", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v3.png"},
    {"name": "4", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v4.png"},
    {"name": "5", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v5.png"},
    {"name": "6", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v6.png"},
    {"name": "7", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v7.png"},
    {"name": "8", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v8.png"},
    {"name": "9", "desc": "Collar Description", "price": "200", "url": "assets/jacket-builder/collars/collar-v11.png"},
  ];

  private selectedCollar: any = {};
  private isSelectedCollar: boolean = false;  

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.selectedCollar = this.jacketBuilderService.suit.collar;
    this.isSelectedCollar = this.jacketBuilderService.isCollarSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectCollar(collar: any) {
    this.selectedCollar = collar;
    this.isSelectedCollar = true;
  }

  private Previous(): void {
    this.jacketBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  private Next(): void {
      this.jacketBuilderService.suit.collar = this.selectedCollar;
      this.jacketBuilderService.isCollarSelected = this.isSelectedCollar;
      this.jacketBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }
}
