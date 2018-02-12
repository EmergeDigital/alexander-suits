import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { FabricStage } from '../../../../models/suit-builder/fabricStage';
import { DataService } from '../../../../services/data.service';
import { Lining } from '../../../../models/lining';

@Component({
  selector: 'suit-builder-fabric-lining',
  templateUrl: './lining.component.html',
  styleUrls: ['./lining.component.scss']
})
export class LiningComponent implements OnInit {

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
    "Dark Navy Blue"
  ];

  private purpleColourTypes: string[] = [
    "Aubergine",
    "Light Purple/Malve",
    "Purple",
    "Fuchsia /with pink"
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

  constructor(private data: DataService, private suitBuilderService: SuitBuilderService) {
    this.GetLinings();
  }

  public ngOnInit(): void {

  }

  private GetLinings(): void {
    console.log("Getting Linings");
    this.isLoading = true;
    this.linings = [];
    this.data.getLinings().then(linings => {
      if(linings.length > 0) {
        this.linings = linings;
        this.FilterLinings();
      } else {
        this.errorMessage = 'No Linings Found';
        console.log(this.errorMessage);
      }
      this.isLoading = false;
    }).catch(ex => {
      this.errorMessage = ex + "Please refresh and try again";
      this.isLoading = false;
      console.log(this.errorMessage);
    });
  }

  private FilterLinings(): void {
    this.filteredLinings = this.linings.filter((lining: Lining) => {
        if(this.selectedPatternType === "" || lining.print === this.selectedPatternType)
            if(this.selectedColourType === "" || this[this.selectedColourType].findIndex(colourType => colourType === lining.primary_colour) !== -1)
              return true;
    })
    .sort((a: Lining, b: Lining) => {
      return this.selectedPriceSortType === "HighToLow" ?  b.price - a.price : a.price - b.price;
    });
    console.log(this.selectedPriceSortType);
  }

  private SelectLining(lining: Lining): void {
    this.selectedLining = lining;
    this.isSelectedLining = true;
  }

  private Previous(): void {
    this.suitBuilderService.SetFabricStage.emit(FabricStage.Material);
  }

  private Next(): void {
    if(this.isSelectedLining) {
      this.suitBuilderService.lining = this.selectedLining;
      this.suitBuilderService.SetWizardStage.emit(WizardStage.Design);
    } 
    else {
      this.errorMessage = "Please Select A Lining";
    }
  }
}
