import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { FabricStage } from '../../../../models/suit-builder/fabricStage';
import { DataService } from '../../../../services/data.service';
import { Lining } from '../../../../models/lining';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'suit-builder-fabric-lining',
  templateUrl: './lining.component.html',
  styleUrls: ['./lining.component.scss']
})
export class LiningComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public blackColourTypes: string[] = [
    "Very light grey",
    "Light Grey",
    "Medium Grey",
    "Charcoal Grey",
    "Black"
  ];

  public darkBlueColourTypes: string[] = [
    "Royal Blue",
    "Cobalt Blue",
    "Navy Blue",
    "Dark Navy Blue",
    "Light Blue",
    "Medium Blue"
  ];

  public purpleColourTypes: string[] = [
    "Aubergine",
    "Light Purple/Malve",
    "Purple",
    "Fuchsia /with pink",
    "Light Pink",
    "Pink",
    "Red",
    "Dark Red",
    "Burgundy"
  ];

  public redColourTypes: string[] = [
    "Light Pink",
    "Pink",
    "Red",
    "Dark Red",
    "Burgundy"
  ];

  public lightBlueColourTypes: string[] = [
    "Light Blue",
    "Medium Blue"
  ];

  public earthColourTypes: string[] = [
    "White",
    "Offwhite",
    "Beige",
    "Orange",
    "Burnt Orange",
    "Light Brown",
    "Brown"
  ];

  public isLoading: boolean = false;
  public errorMessage: string = "";

  public selectedPatternType: string = "";
  public selectedColourType: string = "";
  public selectedPriceSortType: string = "HighToLow";

  public linings: Lining[] = [];
  public selectedLining: Lining = new Lining({});
  public isSelectedLining: boolean = false;

  public filteredLinings: Lining[] = [];

  public carousels: number[] = [];

  constructor(public data: DataService, public suitBuilderService: SuitBuilderService, public toastyService: ToastyService, public toastyConfig: ToastyConfig) {
    this.GetLinings();
  }

  public ngOnInit(): void {
    this.selectedLining = this.suitBuilderService.lining;
    this.isSelectedLining = this.suitBuilderService.isLiningSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public GetLinings(): void {
    console.log("Getting Linings");
    this.isLoading = true;
    this.linings = [];
    this.data.getLinings().then(linings => {
      if (linings.length > 0) {
        this.linings = linings;
        this.FilterLinings();
      } else {
        this.linings = linings;
        this.FilterLinings();
        this.errorMessage = 'No Linings Found';
        console.error(this.errorMessage);
      }
      this.isLoading = false;
    }).catch(ex => {
      this.errorMessage = ex + "Please refresh and try again";
      this.isLoading = false;
      console.error(this.errorMessage);
    });
  }

  public FilterLinings(): void {
    this.filteredLinings = this.linings.filter((lining: Lining) => {
      if (this.selectedPatternType === "" || lining.print === this.selectedPatternType)
        if (this.selectedColourType === "" || this[this.selectedColourType].findIndex(colourType => colourType === lining.primary_colour) !== -1)
          return true;
    })
      .sort((a: Lining, b: Lining) => {
        return this.selectedPriceSortType === "HighToLow" ? b.price - a.price : a.price - b.price;
      });

    this.BuildCarouselList();
  }

  public BuildCarouselList(): void {
    var length: number = 0;
    var ret: number[] = [];

    if (this.filteredLinings.length === 0 || this.filteredLinings.length <= 6) {
      ret.push(1);
      this.carousels = ret;
    }
    else {
      length = Math.ceil(this.filteredLinings.length / 6);

      for (var i = 1; i < length; i++) {
        ret.push(i);
      }
      this.carousels = ret;
    }
  }

  public SelectLining(lining: Lining): void {
    this.selectedLining = lining;
    this.isSelectedLining = true;
  }

  public Previous(): void {
    this.suitBuilderService.SetFabricStage.emit(FabricStage.Material);
  }

  public Next(): void {
    if (this.isSelectedLining) {
      this.suitBuilderService.lining = this.selectedLining;
      this.suitBuilderService.isLiningSelected = this.isSelectedLining;
      this.suitBuilderService.SetWizardStage.emit(WizardStage.Design);
    }
    else {
      this.errorMessage = "Please Select A Lining";

      var toastOptions: ToastOptions = {
        title: "Error",
        msg: this.errorMessage
      };

      this.toastyService.error(toastOptions);
    }
  }
}
