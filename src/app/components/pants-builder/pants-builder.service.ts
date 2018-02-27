import { Injectable, EventEmitter } from "@angular/core";
import { WizardStage } from "../../models/pants-builder/wizardStage";
import { MeasurementStage } from "../../models/pants-builder/measurementsStage";
import { CheckoutStage } from "../../models/pants-builder/checkoutStage";
import { Product } from "../../models/product";
import { Lining } from "../../models/lining";


@Injectable()
export class PantsBuilderService {    
    public collection: string = '';
    public _collectionChanged: EventEmitter<string> = new EventEmitter();

    private wizardStage: WizardStage = WizardStage.Fabric;
    public get WizardStage(): WizardStage { return this.wizardStage; }
    public SetWizardStage: EventEmitter<WizardStage> = new EventEmitter<WizardStage>();

    private measurementsStage: MeasurementStage = MeasurementStage.BodyType;
    public get MeasurementStage(): MeasurementStage { return this.measurementsStage; }
    public SetMeasurementsStage: EventEmitter<MeasurementStage> = new EventEmitter<MeasurementStage>();

    private checkoutStage: CheckoutStage = CheckoutStage.FinalizeCart;
    public get CheckoutStage(): CheckoutStage { return this.checkoutStage; }
    public SetCheckoutStage: EventEmitter<CheckoutStage> = new EventEmitter<CheckoutStage>();

    public product: Product = new Product({});
    public lining: Lining = new Lining({});
    public suit: any = {
        collar: {},
        pockets: {},
        button_holes: {},
        tongue: {},
        vents: {},
        pantPleat: {},
        pantBackPocket: {},
        pantCuff: {},
        waistcoat: false,
        coat: false,
        extra_pants: false,
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
    public isPantPleatSelected: boolean = false;
    public isPantPocketSelected: boolean = false;
    public isPantCuffSelected: boolean = false;
    public isBodyTypeSelected: boolean = false;

    constructor() {
        this.SetWizardStage.subscribe((wizardStage: WizardStage) => this.wizardStage = wizardStage);
        this.SetMeasurementsStage.subscribe((measurementStage: MeasurementStage) => this.measurementsStage = measurementStage);
        this.SetCheckoutStage.subscribe((checkoutStage: CheckoutStage) => this.checkoutStage = checkoutStage);
    }

    public ValidateDesignStage(): string {
        let errorMessage: string = "";
        
        if (!this.isPantPleatSelected)
            errorMessage = errorMessage + "No Pant Pleat Selected. "
        if (!this.isPantPocketSelected)
            errorMessage = errorMessage + "No Pant Pocket Selected. "
        if (!this.isPantCuffSelected)
            errorMessage = errorMessage + "No Pant Cuff Selected. "

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
            pantPleat: {},
            pantBackPocket: {},
            pantCuff: {},
            waistcoat: false,
            coat: false,
            extra_pants: false,
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