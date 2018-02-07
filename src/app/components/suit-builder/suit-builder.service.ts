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
}