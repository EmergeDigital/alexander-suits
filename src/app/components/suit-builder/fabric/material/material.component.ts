import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { DataService } from '../../../../services/data.service';
import { SuitService } from '../../../../services/customizers/suit.service';

@Component({
  selector: 'suit-builder-fabric-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
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

  private isLoading: boolean = false;
  private errorMessage: string = "";

  private selectedOccassionType: string = "";
  private selectedPatternType: string = "";
  private selectedFabricType: string = "";
  private selectedSeasonType: string = "";
  private selectedColourType: string = "";
  private isPriceHighToLow: boolean = false;

  private materials: Product[] = [];
  private selectedMaterial: Product = new Product({});
  private isSelectedMaterial: boolean = false;

  private filteredMaterials: Product[] = [];

  constructor(public data: DataService, public suitService: SuitService) {
    this.GetMaterials(suitService.collection);
    suitService._collectionChanged.subscribe(collection => {
      this.GetMaterials(collection);
    });
  }

  public ngOnInit(): void {

  }

  private GetMaterials(collection) {
    console.log("Getting Materials");
    this.isLoading = true;
    this.materials = [];
    this.data.getProducts().then(materials => { //{collections: collection, category: ["Suit"]}
      if(materials.length > 0) {
        this.materials = materials;
        this.FilterMaterials();
      } else {
        this.errorMessage = 'No Products Found';
        console.log(this.errorMessage);
      }
      this.isLoading = false;
    }).catch(ex => {
      this.errorMessage = ex + "Please refresh and try again";
      this.isLoading = false;
      console.log(this.errorMessage);
    });
  }

  private FilterMaterials(): void {
    this.filteredMaterials = this.materials.filter(material => {
      if(this.selectedOccassionType === "" || material.collections.findIndex(collection => collection === this.selectedOccassionType) !== -1)
        if(this.selectedPatternType === "" || material.print === this.selectedPatternType)
          if(this.selectedFabricType === "" || material.fabric_type.indexOf(this.selectedFabricType) !== -1)
            if(this.selectedColourType === "" || material.primary_colour.indexOf(this.selectedColourType) !== -1)
              return true;
    })
    .sort((a: Product, b: Product) => {
      return this.isPriceHighToLow ? a.price - b.price : b.price - a.price;
    });
    console.log(this.isPriceHighToLow);
  }

  private SelectMaterial(material: Product): void {
    this.selectedMaterial = material;
    this.isSelectedMaterial = true;
  }

  private Next(): void {
    
  }

}
