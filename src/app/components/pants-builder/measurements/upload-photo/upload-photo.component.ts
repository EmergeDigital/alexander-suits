import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { PantsBuilderService } from '../../pants-builder.service';
import { MeasurementStage } from '../../../../models/pants-builder/measurementsStage';
import { WizardStage } from '../../../../models/pants-builder/wizardStage';
import { Ng2ImgToolsService } from 'ng2-img-tools/dist/src/ng2-img-tools.service';
import { DataService } from '../../../../services/data.service';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'pants-builder-measurements-upload-photo',
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

  constructor(public pantsBuilderService: PantsBuilderService, public ng2ImgToolsService: Ng2ImgToolsService,
              public data: DataService, public _loadingService: TdLoadingService, public toastyService: ToastyService, public toastyConfig: ToastyConfig) { }

  public ngOnInit(): void {
    this.currentSuit = this.pantsBuilderService.suit;
    this.uploadedImages = this.pantsBuilderService.suit.uploadedImages;
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
          console.info(response);
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
    this.pantsBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }

  public Next(): void {
    this.pantsBuilderService.suit.uploadedImages = this.uploadedImages;

    this.errorMessage = this.pantsBuilderService.ValidateMeasurementsStage();

    if(this.errorMessage === "") {
      this.data.UpdateCart([this.pantsBuilderService.BuildProduct()]).then(result => {
        console.log(result);
        this._loadingService.resolve('overlayStarSyntax');
        this.pantsBuilderService.SetWizardStage.emit(WizardStage.Checkout);
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
