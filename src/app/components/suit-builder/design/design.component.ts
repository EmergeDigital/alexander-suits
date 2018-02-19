import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../suit-builder.service';
import { DesignStage } from '../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  private DesignStage = DesignStage; //Html Reference

  private currentDesignStage: DesignStage = DesignStage.Collar;

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {
    this.currentDesignStage = this.suitBuilderService.DesignStage;
    this.suitBuilderService.SetDesignStage.subscribe((designStage: DesignStage) => this.currentDesignStage = designStage);
  }

}
