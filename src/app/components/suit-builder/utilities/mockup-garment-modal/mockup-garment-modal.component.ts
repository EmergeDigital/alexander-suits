import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SuitBuilderService } from '../../suit-builder.service';

@Component({
    selector: 'suit-builder-mockup-garment-modal',
    templateUrl: './mockup-garment-modal.component.html',
    styleUrls: ['./mockup-garment-modal.component.scss']
})
export class MockupGarmentModalComponent implements OnInit {

    public isMockupGarment: boolean = false;
    public mockupGarmentInstructions: string = "";

    constructor(public suitBuilderService: SuitBuilderService, public dialogRef: MatDialogRef<MockupGarmentModalComponent>) { }

    public ngOnInit(): void {
        this.isMockupGarment = this.suitBuilderService.suit.mockupGarment.isMockupGarment;
        this.mockupGarmentInstructions = this.suitBuilderService.suit.mockupGarment.instructions;
    }

    public Cancel(): void {
        this.dialogRef.close()
    }

    public Next(): void {
        this.suitBuilderService.suit.mockupGarment.isMockupGarment = this.isMockupGarment;
        this.suitBuilderService.suit.mockupGarment.instructions = this.mockupGarmentInstructions;
        this.dialogRef.close();
    }
}
