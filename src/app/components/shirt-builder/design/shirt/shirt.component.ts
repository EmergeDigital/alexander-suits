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
        { "name": "Simple button catch.", "desc": "This is a plain front, sleek and elegant. We can recommend it for slimmer figures and slim fit shirts.", "url": "" },
        { "name": "Button Catch with fold.", "desc": "This finish adds a bit of workmanship flair to the shirt. It is recommended for more compact customers.","url": "" },
        { "name": "Concealed Button Catch.", "desc": "This finish is made for Tuxedo shirts, specifically. It covers up the buttons to set the scene for the bow tie.","url": "" },
    ];

    private backsMock: any[] = [
        { "name": "Flat Back.", "desc": "Ideal for slender customers with a good balance between shoulders and waist.", "url": "" },
        { "name": "Flat Back with Darts.", "desc": "This finish takes extra volume out at the back. It is suitable for clients with wide shoulders and slim waist or for clients that have a stomach only, but generally a slim frame.", "url": "" },
        { "name": "Back with side folds.", "desc": "This style is for compact figures. The two pleats are located on the back shoulder and allow for some extra room when needed. This finish is not available with darts.", "url": "" },
    ];

    private breastPocketsMock: any[] = [
        { "name": "No Breast Pocket.", "desc": "For the clean look on the front side.", "url": "" },
        { "name": "With breast pocket.", "desc": "Obviously a little support for the customers who like to tuck away their parking tickets or glasses. Please note that -stylewise- pockets are generally not recommended with double cuffs.", "url": "" },
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
                    height: '60%',
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
