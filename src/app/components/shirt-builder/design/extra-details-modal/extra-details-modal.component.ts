import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'shirt-builder-extra-details-modal',
    templateUrl: './extra-details-modal.component.html',
    styleUrls: ['./extra-details-modal.component.scss']
})
export class ExtraDetailsModalComponent {
    constructor(private dialogRef: MatDialogRef<ExtraDetailsModalComponent>) { }

    private SelectNo(): void {
        this.dialogRef.close("false")
    }

    private SelectYes(): void {
        this.dialogRef.close("true");
    }
}
