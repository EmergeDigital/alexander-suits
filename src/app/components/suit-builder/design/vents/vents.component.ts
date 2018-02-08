import { Component, OnInit } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { DesignStage } from '../../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design-vents',
  templateUrl: './vents.component.html',
  styleUrls: ['./vents.component.scss']
})
export class VentsComponent implements OnInit {

  constructor(private suitBuilderService: SuitBuilderService) { }

  public ngOnInit(): void {

  }

  private Previous() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.Pockets);
  }

  private Next() {
    this.suitBuilderService.SetDesignStage.emit(DesignStage.PantStyles);
  }
}
