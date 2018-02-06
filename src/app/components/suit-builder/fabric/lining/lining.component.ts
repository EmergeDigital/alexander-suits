import { Component, OnInit } from '@angular/core';
import { SuitService } from '../../../../services/customizers/suit.service';

@Component({
  selector: 'suit-builder-fabric-lining',
  templateUrl: './lining.component.html',
  styleUrls: ['./lining.component.scss']
})
export class LiningComponent implements OnInit {

  constructor(private suitService: SuitService) { }

  public ngOnInit(): void {

  }

  private Next() {
    this.suitService.NextWizardStage.emit();
  }
}
