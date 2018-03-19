import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'jacket-builder-extra-details-modal',
    templateUrl: './extra-details-modal.component.html',
    styleUrls: ['./extra-details-modal.component.scss']
})
export class ExtraDetailsModalComponent {
    constructor(public dialogRef: MatDialogRef<ExtraDetailsModalComponent>) { }

    public SelectNo(): void {
        this.dialogRef.close("false")
    }

    public SelectYes(): void {
        this.dialogRef.close("true");
    }
}
