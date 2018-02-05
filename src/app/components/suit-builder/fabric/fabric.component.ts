import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'suit-builder-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})
export class FabricComponent implements OnInit {
    isMaterialDisplayed: boolean = true;

    constructor() { }

    public ngOnInit(): void {

    }

}
