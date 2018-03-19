import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../../models/product';
import { DataService } from '../../../../services/data.service';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';

@Component({
  selector: 'shirt-builder-fabric-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MaterialComponent implements OnInit {
  public fabricTypes: string[] = [
    "Cotton",
    "Linen",
    "Wool"
  ];

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
    "Dark Navy Blue"
  ];

  public purpleColourTypes: string[] = [
    "Aubergine",
    "Light Purple/Malve",
    "Purple",
    "Fuchsia /with pink"
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

  public selectedOccassionType: string = "";
  public selectedPatternType: string = "";
  public selectedFabricType: string = "";
  public selectedSeasonType: string = "";
  public selectedColourType: string = "";
  public selectedPriceSortType: string = "HighToLow";

  public materials: Product[] = [];
  public selectedMaterial: Product = new Product({});
  public isSelectedMaterial: boolean = false;

  public filteredMaterials: Product[] = [];

  public carousels: number[] = [];

  constructor(public data: DataService, public shirtBuilderService: ShirtBuilderService) {
    this.GetMaterials(shirtBuilderService.collection);
    shirtBuilderService._collectionChanged.subscribe(collection => {
      this.GetMaterials(collection);
    });
  }

  public ngOnInit(): void {
    this.selectedMaterial = this.shirtBuilderService.product;
    this.isSelectedMaterial = this.shirtBuilderService.isMaterialSelected;
  }

  public GetMaterials(collection): void {
    console.log("Getting Materials");
    this.isLoading = true;
    this.materials = [];
    this.data._getProducts({category: ["Shirt"]}).then(materials => {
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

  public FilterMaterials(): void {
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

  public BuildCarouselList(): void {
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

  public SelectMaterial(material: Product): void {
    this.selectedMaterial = material;
    this.isSelectedMaterial = true;
  }

  public Next(): void {
    if (this.isSelectedMaterial) {
      this.shirtBuilderService.product = this.selectedMaterial;
      this.shirtBuilderService.isMaterialSelected = this.isSelectedMaterial;
      this.shirtBuilderService.SetWizardStage.emit(WizardStage.Design);
    }
    else {
      this.errorMessage = "Please Select A Material";
    }
  }

}