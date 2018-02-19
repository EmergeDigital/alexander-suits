import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SuitBuilderService } from '../../suit-builder.service';

@Component({
    selector: 'suit-builder-mockup-garment-modal',
    templateUrl: './mockup-garment-modal.component.html',
    styleUrls: ['./mockup-garment-modal.component.scss']
})
export class MockupGarmentModalComponent implements OnInit {

    private isMockupGarment: boolean = false;
    private mockupGarmentInstructions: string = "";

    constructor(private suitBuilderService: SuitBuilderService, private dialogRef: MatDialogRef<MockupGarmentModalComponent>) { }

    public ngOnInit(): void {
        this.isMockupGarment = this.suitBuilderService.suit.mockupGarment.isMockupGarment;
        this.mockupGarmentInstructions = this.suitBuilderService.suit.mockupGarment.instructions;
    }

    private Cancel(): void {
        this.dialogRef.close()
    }

    private Next(): void {
        this.suitBuilderService.suit.mockupGarment.isMockupGarment = this.isMockupGarment;
        this.suitBuilderService.suit.mockupGarment.instructions = this.mockupGarmentInstructions;
        this.dialogRef.close();
    }
}
