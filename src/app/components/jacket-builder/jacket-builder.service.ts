import { Injectable, EventEmitter } from "@angular/core";
import { WizardStage } from "../../models/jacket-builder/wizardStage";
import { DesignStage } from "../../models/jacket-builder/designStage";
import { FabricStage } from "../../models/jacket-builder/fabricStage";
import { FinerDetailsStage } from "../../models/jacket-builder/finerDetailsStage";
import { MeasurementStage } from "../../models/jacket-builder/measurementsStage";
import { Product } from "../../models/product";
import { Lining } from "../../models/lining";


@Injectable()
export class JacketBuilderService {    
    public collection: string = '';
    public _collectionChanged: EventEmitter<string> = new EventEmitter();

    public wizardStage: WizardStage = WizardStage.Fabric;
    public get WizardStage(): WizardStage { return this.wizardStage; }
    public SetWizardStage: EventEmitter<WizardStage> = new EventEmitter<WizardStage>();

    public fabricStage: FabricStage = FabricStage.Material;
    public get FabricStage(): FabricStage { return this.fabricStage; }
    public SetFabricStage: EventEmitter<FabricStage> = new EventEmitter<FabricStage>();

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
    public lining: Lining = new Lining({});
    public suit: any = {
        collar: {},
        pockets: {},
        button_holes: {},
        tongue: {},
        vents: {},
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
        mockupGarment: { isMockupGarment: false, instructions: "" },


        //TODO: Check if these fields are neccessary
        // button_hole_colour: {"name": 0, "value": "Default", "color": "Default"},
        buttons: { "name": "0", "value": "Default", "color": "Default" },
        // buttons_comment: "",
        button_stitching: { "name": "0", "value": "Default", "color": "Default" },
        contrast_package: { "name": "0", "value": "None", "color": "Default" },
        // contrast_fabric: {"name": "0", "value": "Default", "color": "Default"},
        oversize: false,
        supersize: false
        //TODO: Check if these fields are neccessary
    };

    public isMaterialSelected: boolean = false;
    public isLiningSelected: boolean = false;
    public isCollarSelected: boolean = false;
    public isPocketsSelected: boolean = false;
    public isVentsSelected: boolean = false;
    public isButtonHoleSelected: boolean = false;
    public isBoutonnerieSelected: boolean = false;
    public isLastButtonSleeveSelected: boolean = false;
    public isContrastPackageSelected: boolean = false;
    public isTopStitchSelected: boolean = false;
    public isBodyTypeSelected: boolean = false;

    public isFinerDetailsShown: boolean = false;

    public isFinerDetailsAccepted: boolean = false;

    constructor() {
        this.SetWizardStage.subscribe((wizardStage: WizardStage) => this.wizardStage = wizardStage);
        this.SetFabricStage.subscribe((fabricStage: FabricStage) => this.fabricStage = fabricStage);
        this.SetDesignStage.subscribe((designStage: DesignStage) => this.designStage = designStage);
        this.SetFinerDetailsStage.subscribe((finerDetailsStage: FinerDetailsStage) => this.finerDetailsStage = finerDetailsStage);
        this.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.measurementsStage = measurementStage);
    }

    public ValidateDesignStage(): string {
        let errorMessage: string = "";

        if (!this.isCollarSelected)
            errorMessage = "No Collar Selected. "
        if (!this.isPocketsSelected)
            errorMessage = errorMessage + "No Pocket Selected. "
        if (!this.isVentsSelected)
            errorMessage = errorMessage + "No Vent Selected. "

        return errorMessage;
    }

    public ValidateFinerDetailsStage(): string {
        let errorMessage: string = "";

        if (!this.isButtonHoleSelected)
            errorMessage = "No Button Hole Selected. "
        if (!this.isBoutonnerieSelected)
            errorMessage = errorMessage + "No Boutonnerie Selected. "
        if (!this.isLastButtonSleeveSelected)
            errorMessage = errorMessage + "No Last Button Sleeve Selected. "
        if (!this.isContrastPackageSelected)
            errorMessage = errorMessage + "No Contrast Package Selected. "
        if (!this.isTopStitchSelected)
            errorMessage = errorMessage + "No Top Stitch Selected. "

        return errorMessage;
    }
    

    public ValidateMeasurementsStage(): string {
        let errorMessage: string = "";

        if (!this.isBodyTypeSelected)
            errorMessage = "No Body Type Selected. "

        return errorMessage;
    }

    public BuildProduct(): Product {
        this.suit.linings = this.lining;
        this.product.extras = this.suit;
        return this.product;
    }

    public ResetProduct() {
        this.product = new Product({});
        this.lining = new Lining({});
        this.suit = {
            collar: {},
            pockets: {},
            button_holes: {},
            tongue: {},
            vents: {},
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

            //TODO: Check if these fields are neccessary
            // button_hole_colour: {"name": 0, "value": "Default", "color": "Default"},
            buttons: { "name": "0", "value": "Default", "color": "Default" },
            // buttons_comment: "",
            button_stitching: { "name": "0", "value": "Default", "color": "Default" },
            contrast_package: { "name": "0", "value": "None", "color": "Default" },
            // contrast_fabric: {"name": "0", "value": "Default", "color": "Default"},
            mockup: false,
            oversize: false,
            supersize: false
            //TODO: Check if these fields are neccessary
        };
    }
}