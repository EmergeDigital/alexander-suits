import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';
import { DesignStage } from '../../../../models/shirt-builder/designStage';
import { ExtraDetailsModalComponent } from '../extra-details-modal/extra-details-modal.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'shirt-builder-design-shirt',
    templateUrl: './shirt.component.html',
    styleUrls: ['./shirt.component.scss']
})
export class ShirtComponent implements OnInit, AfterViewInit {
    @ViewChildren("MainFocus") MainFocus;

    public DesignStage = DesignStage;

    public frontsMock: any[] = [
        { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
        { "name": "2", "desc": "Working button holes","url": "assets/shirt-builder/buttons/buttons-v2.png" },
    ];

    public backsMock: any[] = [
        { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
        { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
    ];

    public breastPocketsMock: any[] = [
        { "name": "1", "desc": "Fake button holes", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
        { "name": "2", "desc": "Working button holes", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
    ];

    public errorMessage: string = "";

    public selectedFront: any = {};
    public isSelectedFront: boolean = false;

    public selectedBack: any = {};
    public isSelectedBack: boolean = false;

    public selectedBreastPocket: any = {};
    public isSelectedBreastPocket: boolean = false;

    public currentSuit: any = {};

    constructor(public shirtBuilderService: ShirtBuilderService, public dialog: MatDialog) { }

    public ngOnInit(): void {
        this.currentSuit = this.shirtBuilderService.suit;
        
        this.selectedFront = this.shirtBuilderService.suit.front;
        this.selectedBack = this.shirtBuilderService.suit.back;
        this.selectedBreastPocket = this.shirtBuilderService.suit.breastPocket;

        this.isSelectedFront = this.shirtBuilderService.isFrontSelected;
        this.isSelectedBack = this.shirtBuilderService.isBackSelected;
        this.isSelectedBreastPocket = this.shirtBuilderService.isBreastPocketSelected;
    }

    public ngAfterViewInit(): void {
        this.MainFocus.first.nativeElement.focus();
    }

    public SelectFront(front: any) {
        this.selectedFront = front;
        this.isSelectedFront = true;
    }

    public SelectBack(back: any) {
        this.selectedBack = back;
        this.isSelectedBack = true;
    }

    public SelectBreastPocket(breastPocket: any) {
        this.selectedBreastPocket = breastPocket;
        this.isSelectedBreastPocket = true;
    }

    public Previous(): void {
        this.shirtBuilderService.SetDesignStage.emit(DesignStage.Sleeve);
    }

    public Next(): void {
        this.shirtBuilderService.suit.front = this.selectedFront;
        this.shirtBuilderService.suit.back = this.selectedBack;
        this.shirtBuilderService.suit.breastPocket = this.selectedBreastPocket;

        this.shirtBuilderService.isFrontSelected = this.isSelectedFront;
        this.shirtBuilderService.isBackSelected = this.isSelectedBack;
        this.shirtBuilderService.isBreastPocketSelected = this.isSelectedBreastPocket;


        this.errorMessage = this.shirtBuilderService.ValidateDesignStage();
        if (this.errorMessage === "") {
            if (this.shirtBuilderService.isFinerDetailsShown === false) {
                let ExtraDetailsModal = this.dialog.open(ExtraDetailsModalComponent, {
                    height: '400px',
                    width: '600px',
                });

                ExtraDetailsModal.afterClosed().subscribe(result => {
                    this.shirtBuilderService.isFinerDetailsShown = true;

                    if (result === "true") 
                        this.shirtBuilderService.isFinerDetailsAccepted = true;
                    else 
                        this.shirtBuilderService.isFinerDetailsAccepted = false;

                    this.shirtBuilderService.SetWizardStage.emit(WizardStage.FinerDetails);
                });
            } else {
                this.shirtBuilderService.SetWizardStage.emit(WizardStage.Measurements);
            }
        }
    }
}
