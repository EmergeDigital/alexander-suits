import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../../services/data.service';
import {SuitService} from "./../../../../services/customizers/suit.service";
import {TabsService} from '../../../../services/tabs.service';
import {Product} from "./../../../../models/product";

@Component({
  selector: 'app-select-fabric',
  templateUrl: './select-fabric.component.html',
  styleUrls: ['./select-fabric.component.scss']
})
export class SelectFabricComponent implements OnInit {
  items: any[];
  loading: boolean = true;
  products: Product[] = [];
  errorMsg: string = '';


  constructor(public data: DataService, public tabs: TabsService, public suitService: SuitService) {
    this.refreshProducts(suitService.collection);
    suitService._collectionChanged.subscribe(collection => {
      this.refreshProducts(collection);
    });

  }

  ngOnInit() {
  }

  selectProduct(product) {
    this.suitService.product = product;
    setTimeout(()=>{
      this.tabs.changeTab("customize");

    }, 1)
  }

  refreshProducts(collection) {
    console.log("refreshing");
    this.loading = true;
    this.products = [];
    this.data._getProducts({collections: collection, category: ["Suit"]}).then(products => {
      if(products.length > 0) {
        this.products = products;
        console.log(this.products);
      } else {
        this.errorMsg = 'No Products Found';
      }
      this.loading = false;
    }).catch(ex => {
      this.errorMsg = ex + "Please refresh and try again";
      this.loading = false;
    });
  }

}
