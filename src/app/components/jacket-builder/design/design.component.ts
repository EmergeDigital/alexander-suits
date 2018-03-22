import { Component, OnInit } from '@angular/core';
import { JacketBuilderService } from '../jacket-builder.service';
import { DesignStage } from '../../../models/jacket-builder/designStage';

@Component({
  selector: 'jacket-builder-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  public DesignStage = DesignStage; //Html Reference

  public currentDesignStage: DesignStage = DesignStage.Collar;

  constructor(public jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentDesignStage = this.jacketBuilderService.DesignStage;
    this.jacketBuilderService.SetDesignStage.subscribe((designStage: DesignStage) => this.currentDesignStage = designStage);
  }

}
