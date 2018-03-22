import { Injectable, EventEmitter } from "@angular/core";
import { WizardStage } from "../../models/shirt-builder/wizardStage";
import { DesignStage } from "../../models/shirt-builder/designStage";
import { FinerDetailsStage } from "../../models/shirt-builder/finerDetailsStage";
import { MeasurementStage } from "../../models/shirt-builder/measurementsStage";
import { Product } from "../../models/product";
import { Lining } from "../../models/lining";


@Injectable()
export class ShirtBuilderService {    
    public collection: string = '';
    public _collectionChanged: EventEmitter<string> = new EventEmitter();

    public wizardStage: WizardStage = WizardStage.Fabric;
    public get WizardStage(): WizardStage { return this.wizardStage; }
    public SetWizardStage: EventEmitter<WizardStage> = new EventEmitter<WizardStage>();

    public designStage: DesignStage = DesignStage.Collar;
    public get DesignStage(): DesignStage { return this.designStage; }
    public SetDesignStage: EventEmitter<DesignStage> = new EventEmitter<DesignStage>();

    public finerDetailsStage: FinerDetailsStage = FinerDetailsStage.ButtonStyles;
    public get FinerDetailsStage(): FinerDetailsStage { return this.finerDetailsStage; }
    public SetFinerDetailsStage: EventEmitter<FinerDetailsStage> = new EventEmitter<FinerDetailsStage>();

    public measurementsStage: MeasurementStage = MeasurementStage.BodyType;
    public get MeasurementStage(): MeasurementStage { return this.measurementsStage; }
    public SetMeasurementsStage: EventEmitter<MeasurementStage> = new EventEmitter<MeasurementStage>();

    public product: Product = new Product({});
    public suit: any = {
        collar: {},
        sleeve: {},
        cuff: {},
        front: {},
        back: {},
        breastPocket: {},
        buttonHole: {},
        boutonnerie: {},
        lastButtonSleeve: {},
        contrastpackage: {},
        topStitch: {},
        contrastPackageColour: {},
        bodyType: {},
        generalMeasurements: { height: 0, chest: 0, back: 0, biceps: 0, stomach: 0, seat: 0, thigh: 0 },
        finerMeasurements: { jacketBackLength: 0, jacketWaist: 0, withoutTrouserWaist: 0, withoutTrouserOutsideSeam: 0, trouserWaist: 0, trouserInsideSeam: 0, trouserOutsideSeam: 0 },
        uploadedImages: { front: "", left: "", right: "", back: "" },
        mockupGarment: { isMockupGarment: false, instructions: "" }
    };

    public isMaterialSelected: boolean = false;
    public isCollarSelected: boolean = false;
    public isSleeveSelected: boolean = false;
    public isCuffSelected: boolean = false;
    public isFrontSelected: boolean = false;
    public isBackSelected: boolean = false;
    public isBreastPocketSelected: boolean = false;
    public isButtonHoleSelected: boolean = false;
    public isBoutonnerieSelected: boolean = false;
    public isContrastPackageSelected: boolean = false;
    public isBodyTypeSelected: boolean = false;

    public isFinerDetailsShown: boolean = false;

    public isFinerDetailsAccepted: boolean = false;

    constructor() {
        this.SetWizardStage.subscribe((wizardStage: WizardStage) => this.wizardStage = wizardStage);
        this.SetDesignStage.subscribe((designStage: DesignStage) => this.designStage = designStage);
        this.SetFinerDetailsStage.subscribe((finerDetailsStage: FinerDetailsStage) => this.finerDetailsStage = finerDetailsStage);
        this.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.measurementsStage = measurementStage);
    }

    public ValidateDesignStage(): string {
        let errorMessage: string = "";

        if (!this.isCollarSelected)
            errorMessage = "No Collar Selected. "
        if (!this.isSleeveSelected)
            errorMessage = errorMessage + "No Sleeve Selected. "
        if (!this.isCuffSelected)
            errorMessage = errorMessage + "No Cuff Selected. "
        if (!this.isFrontSelected)
            errorMessage = errorMessage + "No Shirt Back Selected. "
        if (!this.isBackSelected)
            errorMessage = errorMessage + "No Shirt Front Selected. "
        if (!this.isBreastPocketSelected)
            errorMessage = errorMessage + "No Breast Pocket Selected. "

        return errorMessage;
    }

    public ValidateFinerDetailsStage(): string {
        let errorMessage: string = "";

        if (!this.isButtonHoleSelected)
            errorMessage = "No Button Hole Selected. "
        if (!this.isBoutonnerieSelected)
            errorMessage = errorMessage + "No Boutonnerie Selected. "
        if (!this.isContrastPackageSelected)
            errorMessage = errorMessage + "No Contrast Package Selected. "

        return errorMessage;
    }
    

    public ValidateMeasurementsStage(): string {
        let errorMessage: string = "";

        if (!this.isBodyTypeSelected)
            errorMessage = "No Body Type Selected. "

        return errorMessage;
    }

    public BuildProduct(): Product {
        this.product.extras = this.suit;
        return this.product;
    }

    public ResetProduct() {
        this.product = new Product({});
        this.suit = {
            collar: {},
            sleeve: {},
            cuff: {},
            front: {},
            back: {},
            breastPocket: {},
            buttonHole: {},
            boutonnerie: {},
            lastButtonSleeve: {},
            contrastpackage: {},
            topStitch: {},
            contrastPackageColour: {},
            bodyType: {},
            generalMeasurements: { height: 0, chest: 0, back: 0, biceps: 0, stomach: 0, seat: 0, thigh: 0 },
            finerMeasurements: { jacketBackLength: 0, jacketWaist: 0, withoutTrouserWaist: 0, withoutTrouserOutsideSeam: 0, trouserWaist: 0, trouserInsideSeam: 0, trouserOutsideSeam: 0 },
            uploadedImages: { front: "", left: "", right: "", back: "" }
        };
    }
}