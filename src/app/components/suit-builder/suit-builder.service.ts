import { Injectable, EventEmitter } from "@angular/core";
import { WizardStage } from "../../models/suit-builder/wizardStage";
import { DesignStage } from "../../models/suit-builder/designStage";
import { FabricStage } from "../../models/suit-builder/fabricStage";
import { FinerDetailsStage } from "../../models/suit-builder/finerDetailsStage";
import { MeasurementStage } from "../../models/suit-builder/measurementsStage";
import { CheckoutStage } from "../../models/suit-builder/checkoutStage";
import { Product } from "../../models/product";
import { Lining } from "../../models/lining";


@Injectable()
export class SuitBuilderService {
    public SetWizardStage: EventEmitter<WizardStage> = new EventEmitter<WizardStage>();
    public SetFabricStage: EventEmitter<FabricStage> = new EventEmitter<FabricStage>();
    public SetDesignStage: EventEmitter<DesignStage> = new EventEmitter<DesignStage>();
    public SetFinerDetailsStage: EventEmitter<FinerDetailsStage> = new EventEmitter<FinerDetailsStage>();
    public SetMeasurementsStage: EventEmitter<MeasurementStage> = new EventEmitter<MeasurementStage>();
    public SetCheckoutStage: EventEmitter<CheckoutStage> = new EventEmitter<CheckoutStage>();

    public product: Product = new Product({});
    public lining: Lining = new Lining({});
    public suit: any = {
        collar: { "name": "1", "desc": "Collar Description", "price": "200", "url": "assets/suit-builder/collars/collar-v1.png" },
        pockets: { "name": "1", "desc": "Pocket Description", "price": "200", "url": "assets/suit-builder/pockets/pocket-v1.png" },
        button_holes: { "name": "1", "desc": "Fake button holes", "url": "assets/suit-builder/buttons/buttons-v1.png" },
        tongue: { "name": "1", "desc": "Tongue facing integrated", "url": "assets/suit-builder/tongue/tongue-v1.png" },
        vents: { "name": "1", "desc": "Vent Description", "price": "200", "url": "assets/suit-builder/vents/vents-v1.png" },
        pantPleat: { "name": "1", "desc": "Pant Pleat Description", "price": "200", "url": "" },
        pantBackPocket: { "name": "1", "desc": "Pant Back Pocket Description", "price": "200", "url": "" },
        pantCuff: { "name": "1", "desc": "Pant Cuff Description", "price": "200", "url": "" },
        waistcoat: false,
        coat: false,
        extra_pants: false,
        // button_hole_colour: {"name": 0, "value": "Default", "color": "Default"},
        buttons: { "name": "0", "value": "Default", "color": "Default" },
        // buttons_comment: "",
        button_stitching: { "name": "0", "value": "Default", "color": "Default" },
        contrast_package: { "name": "0", "value": "None", "color": "Default" },
        // contrast_fabric: {"name": "0", "value": "Default", "color": "Default"},
        mockup: false,
        oversize: false,
        supersize: false
    };
}