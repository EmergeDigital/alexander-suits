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
    {"name": "Normal", "desc": "A normal lapel collar with a 1 button single breasted style.", "url": "assets/suit-builder/collars/collar-v1.png"},
    {"name": "Normal", "desc": "A normal lapel collar with a 2 button single breasted style.", "url": "assets/suit-builder/collars/collar-v3.png"},
    {"name": "Normal", "desc": "A normal lapel collar with a 3 button single breasted style", "url": "assets/suit-builder/collars/collar-v7.png"},
    {"name": "Normal Medium Width", "desc": "A normal medium width lapel collar with a 2 button single breasted style.", "url": "assets/suit-builder/collars/collar-v4.png"},
    {"name": "Scarf", "desc": "A scarf lapel collar with a 1 button single breasted style.", "url": "assets/suit-builder/collars/collar-v2.png"},
    {"name": "Scarf", "desc": "A scarf lapel collar with a 2 button single breasted style.", "url": "assets/suit-builder/collars/collar-v6.png"},
    {"name": "Rising", "desc": "A rising lapel collar with a 1 button single breasted style.", "url": "assets/suit-builder/collars/collar-v11.png"},
    {"name": "Rising", "desc": "A rising lapel collar with a 2 button single breasted style.", "url": "assets/suit-builder/collars/collar-v5.png"},
    {"name": "Rising", "desc": "A rising lapel collar with a 2 button double breasted style.", "url": "assets/suit-builder/collars/collar-v8.png"},
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
