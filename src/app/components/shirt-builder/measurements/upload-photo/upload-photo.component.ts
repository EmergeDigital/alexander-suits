import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { MeasurementStage } from '../../../../models/shirt-builder/measurementsStage';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';
import { Ng2ImgToolsService } from 'ng2-img-tools/dist/src/ng2-img-tools.service';
import { DataService } from '../../../../services/data.service';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';

@Component({
  selector: 'shirt-builder-measurements-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;

  private MeasurementStage = MeasurementStage;

  private uploadedImages: any = { front: "", left: "", right: "", back: "" };

  private errorMessage: string = "";

  public uploading: boolean = false;

  public currentSuit: any = {};

  constructor(private shirtBuilderService: ShirtBuilderService, private ng2ImgToolsService: Ng2ImgToolsService,
              private data: DataService, private _loadingService: TdLoadingService) { }

  public ngOnInit(): void {
    this.currentSuit = this.shirtBuilderService.suit;
    this.uploadedImages = this.shirtBuilderService.suit.uploadedImages;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private FrontImageSelect(file: File) {
    this.FileUploadSelect(file, "front");
  }

  private LeftImageSelect(file: File) {
    this.FileUploadSelect(file, "left");
  }

  private RightImageSelect(file: File) {
    this.FileUploadSelect(file, "right");
  }

  private BackImageSelect(file: File) {
    this.FileUploadSelect(file, "back");
  }

  private FileUploadSelect(file: File, imageToUpdate: string): void {
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

  private FileUploadCancel(imageToCancel: string): void {
    this.uploadedImages[imageToCancel] = "";
  }

  private Previous(): void {
    this.shirtBuilderService.SetMeasurementsStage.emit(MeasurementStage.FinerMeasurements);
  }

  private Next(): void {
    this.shirtBuilderService.suit.uploadedImages = this.uploadedImages;
    
    this.errorMessage = this.shirtBuilderService.ValidateMeasurementsStage();
    
    if(this.errorMessage === "") {
      this.data.addToCart([this.shirtBuilderService.BuildProduct()]).then(result => {
        console.log(result);
        this._loadingService.resolve('overlayStarSyntax');  
        this.shirtBuilderService.SetWizardStage.emit(WizardStage.Checkout);
      }).catch(ex => {
        alert("There was a problem");
        this._loadingService.resolve('overlayStarSyntax');
      });
    }
  }
}
