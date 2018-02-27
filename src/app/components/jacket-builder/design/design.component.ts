import { Component, OnInit } from '@angular/core';
import { JacketBuilderService } from '../jacket-builder.service';
import { DesignStage } from '../../../models/jacket-builder/designStage';

@Component({
  selector: 'jacket-builder-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  private DesignStage = DesignStage; //Html Reference

  private currentDesignStage: DesignStage = DesignStage.Collar;

  constructor(private jacketBuilderService: JacketBuilderService) { }

  public ngOnInit(): void {
    this.currentDesignStage = this.jacketBuilderService.DesignStage;
    this.jacketBuilderService.SetDesignStage.subscribe((designStage: DesignStage) => this.currentDesignStage = designStage);
  }

}
