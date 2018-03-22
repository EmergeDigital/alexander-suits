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
  
  public DesignStage = DesignStage;

  public collarsMock: any[] = [
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

  public selectedCollar: any = {};
  public isSelectedCollar: boolean = false;  

  constructor(public jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.selectedCollar = this.jacketBuilderService.suit.collar;
    this.isSelectedCollar = this.jacketBuilderService.isCollarSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public SelectCollar(collar: any) {
    this.selectedCollar = collar;
    this.isSelectedCollar = true;
  }

  public Previous(): void {
    this.jacketBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  public Next(): void {
      this.jacketBuilderService.suit.collar = this.selectedCollar;
      this.jacketBuilderService.isCollarSelected = this.isSelectedCollar;
      this.jacketBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }
}
