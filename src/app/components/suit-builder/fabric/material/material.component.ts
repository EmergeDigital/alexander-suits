import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';

@Component({
  selector: 'suit-builder-fabric-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {
  private occassionTypes: string[] = [
    "Casual",
    "Business / Formal",
    "Ceremonial"
  ];

  private patternTypes: string[] = [
    "Check",
    "Solid",
    "Stripe",
    "Subtle / Pattern"
  ];

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

  private selectedOccassionType: string = "";
  private selectedPatternType: string = "";
  private selectedFabricType: string = "";
  private selectedSeasonType: string = "";
  private selectedColourType: string = "";
  private isPriceHighToLow: boolean = false;

  private materials: Product[] = [];
  private selectedMaterial: Product = new Product({});

  private filteredMaterials: Product[] = [];

  constructor() { }

  public ngOnInit(): void {

  }

  private FilterMaterials(): void {
    this.filteredMaterials = this.materials.filter(material => {
      if(this.selectedOccassionType === "" || material.collections.findIndex(collection => collection === this.selectedOccassionType) !== -1)
        if(this.selectedPatternType === "" || material.print === this.selectedPatternType)
          if(this.selectedFabricType === "" || material.fabric_type === this.selectedFabricType) // Missing Season type
            if(this.selectedColourType === "" || material.primary_colour === this.selectedColourType)
              return true;
    })
    .sort((a: Product, b: Product) => {
      return this.isPriceHighToLow ? a.price - b.price : b.price - a.price;
    });
  }

  private SelectMaterial(): void {
    
  }

  private Next(): void {
    
  }

}
