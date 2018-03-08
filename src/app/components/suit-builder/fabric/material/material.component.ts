import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../../models/product';
import { DataService } from '../../../../services/data.service';
import { SuitBuilderService } from '../../suit-builder.service';
import { FabricStage } from '../../../../models/suit-builder/fabricStage';

@Component({
  selector: 'suit-builder-fabric-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialComponent implements OnInit {
  private fabricTypes: string[] = [
    "Cotton",
    "Linen",
    "Wool"
  ];

  private seasonTypes: string[] = [
    "Spring / Summer",
    "Autumn / Winter",
    "Transitional / Everyday"
  ];

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

  private selectedOccassionType: string = "";
  private selectedPatternType: string = "";
  private selectedFabricType: string = "";
  private selectedSeasonType: string = "";
  private selectedColourType: string = "";
  private selectedPriceSortType: string = "HighToLow";

  private materials: Product[] = [];
  private selectedMaterial: Product = new Product({});
  private isSelectedMaterial: boolean = false;

  private filteredMaterials: Product[] = [];

  private carousels: number[] = [];

  constructor(private data: DataService, private suitBuilderService: SuitBuilderService) {
    this.GetMaterials(suitBuilderService.collection);
    suitBuilderService._collectionChanged.subscribe(collection => {
      this.GetMaterials(collection);
    });
  }

  public ngOnInit(): void {
    this.selectedMaterial = this.suitBuilderService.product;
    this.isSelectedMaterial = this.suitBuilderService.isMaterialSelected;
  }

  private GetMaterials(collection): void {
    console.log("Getting Materials");
    this.isLoading = true;
    this.materials = [];
    this.data._getProducts({category: ["Suit"]}).then(materials => {
      if (materials.length > 0) {
        this.materials = materials;
        this.FilterMaterials();
      } else {
        this.materials = materials;
        this.FilterMaterials();
        this.errorMessage = 'No Products Found';
        console.error(this.errorMessage);
      }
      this.isLoading = false;
    }).catch(ex => {
      this.errorMessage = ex + "Please refresh and try again";
      this.isLoading = false;
      console.error(this.errorMessage);
    });
  }

  private FilterMaterials(): void {
    this.filteredMaterials = this.materials.filter((material: Product) => {
      if (this.selectedOccassionType === "" || material.collections.findIndex(collection => collection === this.selectedOccassionType) !== -1)
        if (this.selectedPatternType === "" || material.print === this.selectedPatternType)
          if (this.selectedFabricType === "" || material.fabric_type.indexOf(this.selectedFabricType) !== -1)
            if (this.selectedColourType === "" || this[this.selectedColourType].findIndex(colourType => colourType === material.primary_colour) !== -1)
              return true;
    })
      .sort((a: Product, b: Product) => {
        return this.selectedPriceSortType === "HighToLow" ? b.price - a.price : a.price - b.price;
      });

    this.BuildCarouselList();
  }

  private BuildCarouselList(): void {
    var length: number = 0;
    var ret: number[] = [];

    if (this.filteredMaterials.length === 0 || this.filteredMaterials.length <= 6) {
      ret.push(1);
      this.carousels = ret;
    }
    else {
      length = Math.ceil(this.filteredMaterials.length / 6);

      for (var i = 1; i < length; i++) {
        ret.push(i);
      }
      this.carousels = ret;
    }
  }

  private SelectMaterial(material: Product): void {
    this.selectedMaterial = material;
    this.isSelectedMaterial = true;
  }

  private Next(): void {
    if (this.isSelectedMaterial) {
      this.suitBuilderService.product = this.selectedMaterial;
      this.suitBuilderService.isMaterialSelected = this.isSelectedMaterial;
      this.suitBuilderService.SetFabricStage.emit(FabricStage.Lining);
    }
    else {
      this.errorMessage = "Please Select A Material";
    }
  }

}