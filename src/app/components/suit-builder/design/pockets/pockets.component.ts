import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-pockets',
  templateUrl: './pockets.component.html',
  styleUrls: ['./pockets.component.scss']
})
export class PocketsComponent implements OnInit {

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {

  }

  private Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Collar);
  }

  private Next() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Vents);
  }
}
