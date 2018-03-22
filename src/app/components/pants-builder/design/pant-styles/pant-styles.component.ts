import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { WizardStage } from '../../../../models/pants-builder/wizardStage';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'pants-builder-design-pant-styles',
  templateUrl: './pant-styles.component.html',
  styleUrls: ['./pant-styles.component.scss']
})
export class PantStylesComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public pantPleatsMock: any[] = [
    { "name": "Flat", "desc": "A flat front style.", "url": "" },
    { "name": "Dart", "desc": "A single darted front style. ", "url": "assets/suit-builder/pants/pants-v1.png" },
    { "name": "Single", "desc": "A single pleated front style", "url": "assets/suit-builder/pants/pants-v3.png" },
    { "name": "Double", "desc": "A double pleated front style", "url": "assets/suit-builder/pants/pants-v2.png" },
  ];

  public pantPocketsMock: any[] = [
    { "name": "None", "desc": "A no pocket style.", "url": "" },
    { "name": "One", "desc": "A one pocket style.", "url": "" },
    { "name": "Two", "desc": "A two pockets style.", "url": "" },
  ];

  public pantCuffsMock: any[] = [
    { "name": "None", "desc": "A seem cuff without turnups style.", "url": "" },
    { "name": "Turnups", "desc": "A seem cuff with turnups style.", "url": "" },
  ];

  public errorMessage: string = "";

  public selectedPantPleat: any = {};
  public isSelectedPantPleat: boolean = false;

  public selectedPantPocket: any = {};
  public isSelectedPantPocket: boolean = false;

  public selectedPantCuff: any = {};
  public isSelectedPantCuff: boolean = false;

  public currentSuit: any = {};

  constructor(public pantsBuilderService: PantsBuilderService, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.selectedPantPleat = this.pantsBuilderService.suit.pantPleat;
    this.selectedPantPocket = this.pantsBuilderService.suit.pantBackPocket;
    this.selectedPantCuff = this.pantsBuilderService.suit.pantCuff;

    this.isSelectedPantPleat = this.pantsBuilderService.isPantPleatSelected;
    this.isSelectedPantPocket = this.pantsBuilderService.isPantPocketSelected;
    this.isSelectedPantCuff = this.pantsBuilderService.isPantCuffSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public GetPantPocketBackgroundSelected(): string {
    var ret = "";

    if (this.isSelectedPantPleat)
      ret = 'url(' + this.selectedPantPleat.url + '),';

    if (this.isSelectedPantPocket)
      ret = ret + ' url(' + this.selectedPantPocket.url + '),';

    return ret + ' url("assets/suit-builder/pants-base.png")';
  }

  public GetPantCuffBackgroundSelected(): string {
    var ret = "";

    if (this.isSelectedPantPleat)
      ret = 'url(' + this.selectedPantPleat.url + '),';

    if (this.isSelectedPantPocket)
      ret = ret + ' url(' + this.selectedPantPocket.url + '),';

    if (this.isSelectedPantPocket)
      ret = ret + ' url(' + this.selectedPantCuff.url + '),';

    return ret + ' url("assets/suit-builder/pants-base.png")';
  }

  public SelectPantPleat(pantPleat: any) {
    this.selectedPantPleat = pantPleat;
    this.isSelectedPantPleat = true;
  }

  public SelectPantPocket(pantPocket: any) {
    this.selectedPantPocket = pantPocket;
    this.isSelectedPantPocket = true;
  }

  public SelectPantCuff(pantCuff: any) {
    this.selectedPantCuff = pantCuff;
    this.isSelectedPantCuff = true;
  }

  public Previous() {
    this.pantsBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  public Next() {
    this.pantsBuilderService.suit.pantPleat = this.selectedPantPleat;
    this.pantsBuilderService.suit.pantBackPocket = this.selectedPantPocket;
    this.pantsBuilderService.suit.pantCuff = this.selectedPantCuff;

    this.pantsBuilderService.isPantPleatSelected = this.isSelectedPantPleat;
    this.pantsBuilderService.isPantPocketSelected = this.isSelectedPantPocket;
    this.pantsBuilderService.isPantCuffSelected = this.isSelectedPantCuff;

    this.errorMessage = this.pantsBuilderService.ValidateDesignStage();
    if (this.errorMessage === "") {
      this.pantsBuilderService.SetWizardStage.emit(WizardStage.Measurements);
    } else {
      var toastOptions: ToastOptions = {
        title: "Error",
        msg: this.errorMessage
      };

      this.toastyService.error(toastOptions);
      console.log();
    }
  }
}
