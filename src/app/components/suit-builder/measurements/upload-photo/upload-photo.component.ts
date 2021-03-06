import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { SuitBuilderService } from '../../suit-builder.service';
import { MeasurementStage } from '../../../../models/suit-builder/measurementsStage';
import { WizardStage } from '../../../../models/suit-builder/wizardStage';
import { Ng2ImgToolsService } from 'ng2-img-tools/dist/src/ng2-img-tools.service';
import { DataService } from '../../../../services/data.service';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'suit-builder-measurements-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  public MeasurementStage = MeasurementStage;

  public uploadedImages: any = { front: "", left: "", right: "", back: "" };

  public errorMessage: string = "";

  public uploading: boolean = false;

  public currentSuit: any = {};

  constructor(public suitBuilderService: SuitBuilderService, public ng2ImgToolsService: Ng2ImgToolsService,
    public data: DataService, public _loadingService: TdLoadingService, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.suitBuilderService.suit;
    this.uploadedImages = this.suitBuilderService.suit.uploadedImages;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  public FrontImageSelect(file: File) {
    this.FileUploadSelect(file, "front");
  }

  public LeftImageSelect(file: File) {
    this.FileUploadSelect(file, "left");
  }

  public RightImageSelect(file: File) {
    this.FileUploadSelect(file, "right");
  }

  public BackImageSelect(file: File) {
    this.FileUploadSelect(file, "back");
  }

  public FileUploadSelect(file: File, imageToUpdate: string): void {
    this._loadingService.register('overlayStarSyntax');
    this.ng2ImgToolsService.resizeExactCrop([file], 180, 180).subscribe(result => {
      console.info(result);
      this.data.uploadImage(result).then(response => {
        this.uploadedImages[imageToUpdate] = response;
        this._loadingService.resolve('overlayStarSyntax');
      });
    }, error => {
      this.FileUploadCancel(imageToUpdate);
      //this.error("Thumbnail Creation Failed", "Please try select your image again");
      this._loadingService.resolve('overlayStarSyntax');
    });
  }

  public FileUploadCancel(imageToCancel: string): void {
    this.uploadedImages[imageToCancel] = "";
  }

  public Previous(): void {
    this.suitBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }

  public Next(): void {
    this.suitBuilderService.suit.uploadedImages = this.uploadedImages;

    this.errorMessage = this.suitBuilderService.ValidateMeasurementsStage();

    if (this.errorMessage === "") {
      console.log(this.suitBuilderService.BuildProduct());
      this.data.UpdateCart([this.suitBuilderService.BuildProduct()], this.suitBuilderService.CalculateTotalPrice()).then(result => {
        console.log(result);
        this._loadingService.resolve('overlayStarSyntax');
        this.suitBuilderService.SetWizardStage.emit(WizardStage.Checkout);
      }).catch(ex => {
        alert("There was a problem");
        this._loadingService.resolve('overlayStarSyntax');
      });
    } else {
      var toastOptions: ToastOptions = {
        title: "Error",
        msg: this.errorMessage
      };

      this.toastyService.error(toastOptions);
      console.log();
    }
  }
}
