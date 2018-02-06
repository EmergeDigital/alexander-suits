import { Component, OnInit } from '@angular/core';
import { SuitService } from '../../../services/customizers/suit.service';

@Component({
  selector: 'suit-builder-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
  private isMaterialDisplayed: boolean = true;

  constructor(private suitService: SuitService) { }

  public ngOnInit(): void {
    this.suitService.IsMaterialStage.subscribe((isMaterialDisplayed: boolean) => this.isMaterialDisplayed = isMaterialDisplayed);
  }

}
