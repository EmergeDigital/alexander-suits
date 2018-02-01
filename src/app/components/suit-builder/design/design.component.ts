import { Component, OnInit } from '@angular/core';
import { DesignStage } from '../../../models/suit-builder/designStage';

@Component({
  selector: 'suit-builder-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
    DesignStage = DesignStage; //Html Reference

    currentDesignStage: DesignStage = DesignStage.Collar;

    constructor() { }

    public ngOnInit(): void {

    }

}
