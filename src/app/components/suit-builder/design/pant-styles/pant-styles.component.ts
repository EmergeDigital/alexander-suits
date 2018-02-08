import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-pant-styles',
  templateUrl: './pant-styles.component.html',
  styleUrls: ['./pant-styles.component.scss']
})
export class PantStylesComponent implements OnInit {

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {

  }

  private Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Vents);
  }

  private Next() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Addons);
  }
}
