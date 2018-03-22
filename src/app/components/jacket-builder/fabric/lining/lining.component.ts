import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { JacketBuilderService } from '../../jacket-builder.service';
import { WizardStage } from '../../../../models/jacket-builder/wizardStage';
import { FabricStage } from '../../../../models/jacket-builder/fabricStage';
import { DataService } from '../../../../services/data.service';
import { Lining } from '../../../../models/lining';

@Component({
  selector: 'jacket-builder-fabric-lining',
  templateUrl: './lining.component.html',
  styleUrls: ['./lining.component.scss']
})
export class LiningComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  private blackColourTypes: string[] = [
    "Very light grey",
    "Light Grey",
    "Medium Grey",
    "Charcoal Grey",
    "Black"
  ];

  private darkBlueColourTypes: string[] = [
    "Royal Blue",
    "Cobalt Blue",
    "Navy Blue",
    "Dark Navy Blue",
    "Light Blue",
    "Medium Blue"
  ];

  private purpleColourTypes: string[] = [
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

  private redColourTypes: string[] = [
    "Light Pink",
    "Pink",
    "Red",
    "Dark Red",
    "Burgundy"
  ];

  private lightBlueColourTypes: string[] = [
    "Light Blue",
    "Medium Blue"
  ];

  private earthColourTypes: string[] = [
    "White",
    "Offwhite",
    "Beige",
    "Orange",
    "Burnt Orange",
    "Light Brown",
    "Brown"
  ];

  private isLoading: boolean = false;
  private errorMessage: string = "";

  private selectedPatternType: string = "";
  private selectedColourType: string = "";
  private selectedPriceSortType: string = "HighToLow";

  private linings: Lining[] = [];
  private selectedLining: Lining = new Lining({});
  private isSelectedLining: boolean = false;

  private filteredLinings: Lining[] = [];

  private carousels: number[] = [];

  constructor(private data: DataService, private jacketBuilderService: JacketBuilderService) {
    this.GetLinings();
  }

  public ngOnInit(): void {
    this.selectedLining = this.jacketBuilderService.lining;
    this.isSelectedLining = this.jacketBuilderService.isLiningSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private GetLinings(): void {
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

  private FilterLinings(): void {
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

  private BuildCarouselList(): void {
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

  private SelectLining(lining: Lining): void {
    this.selectedLining = lining;
    this.isSelectedLining = true;
  }

  private Previous(): void {
    this.jacketBuilderService.SetFabricStage.emit(FabricStage.Material);
  }

  private Next(): void {
    if (this.isSelectedLining) {
      this.jacketBuilderService.lining = this.selectedLining;
      this.jacketBuilderService.isLiningSelected = this.isSelectedLining;
      this.jacketBuilderService.SetWizardStage.emit(WizardStage.Design);
    }
    else {
      this.errorMessage = "Please Select A Lining";
    }
  }
}
