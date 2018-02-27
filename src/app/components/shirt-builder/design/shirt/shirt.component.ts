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

    private DesignStage = DesignStage;

    private frontsMock: any[] = [
        { "name": "1", "desc": "Fake button holes", "price": "200", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
        { "name": "2", "desc": "Working button holes", "price": "200", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
    ];

    private backsMock: any[] = [
        { "name": "1", "desc": "Fake button holes", "price": "200", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
        { "name": "2", "desc": "Working button holes", "price": "200", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
    ];

    private breastPocketsMock: any[] = [
        { "name": "1", "desc": "Fake button holes", "price": "200", "url": "assets/shirt-builder/buttons/buttons-v1.png" },
        { "name": "2", "desc": "Working button holes", "price": "200", "url": "assets/shirt-builder/buttons/buttons-v2.png" },
    ];

    private errorMessage: string = "";

    private selectedFront: any = {};
    private isSelectedFront: boolean = false;

    private selectedBack: any = {};
    private isSelectedBack: boolean = false;

    private selectedBreastPocket: any = {};
    private isSelectedBreastPocket: boolean = false;

    private currentSuit: any = {};

    constructor(private shirtBuilderService: ShirtBuilderService, private dialog: MatDialog) { }

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

    private SelectFront(front: any) {
        this.selectedFront = front;
        this.isSelectedFront = true;
    }

    private SelectBack(back: any) {
        this.selectedBack = back;
        this.isSelectedBack = true;
    }

    private SelectBreastPocket(breastPocket: any) {
        this.selectedBreastPocket = breastPocket;
        this.isSelectedBreastPocket = true;
    }

    private Previous(): void {
        this.shirtBuilderService.SetDesignStage.emit(DesignStage.Sleeve);
    }

    private Next(): void {
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
