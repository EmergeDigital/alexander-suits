import { Component, OnInit } from '@angular/core';
import { ShirtBuilderService } from '../shirt-builder.service';
import { DesignStage } from '../../../models/shirt-builder/designStage';

@Component({
  selector: 'shirt-builder-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  public DesignStage = DesignStage; //Html Reference

  public currentDesignStage: DesignStage = DesignStage.Collar;

  constructor(public shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.currentDesignStage = this.shirtBuilderService.DesignStage;
    this.shirtBuilderService.SetDesignStage.subscribe((designStage: DesignStage) => this.currentDesignStage = designStage);
  }

}
