import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { ShirtBuilderService } from '../../shirt-builder.service';
import { WizardStage } from '../../../../models/shirt-builder/wizardStage';
import { DesignStage } from '../../../../models/shirt-builder/designStage';

@Component({
  selector: 'shirt-builder-design-collar',
  templateUrl: './collar.component.html',
  styleUrls: ['./collar.component.scss']
})
export class CollarComponent implements OnInit, AfterViewInit {
  @ViewChildren("MainFocus") MainFocus;
  
  private DesignStage = DesignStage;

  private collarsMock: any[] = [
    {"name": "Kent collar (Pointed), medium stand.", "desc": "Suitable for customers with a slim neck.nThe closed setup requires a slim tie knot, preferably a Four- In - Hand. Also good tonbe worn without a tie, since the collar stands up nice and straight.", "url": ""},
    {"name": "Kent collar (Pointed) low stand (39mm).", "desc": "Suitable for a more compact neck. As with its brother, the KR100, the pointed collar can play out its strength when wearing the shirt without a tie or when the tie knot is reasonably small. Please don’T make a Windsor knot, as it would lift up the edges.", "url": ""},
    {"name": "Kent Collar (Pointed), high Stand.", "desc": "The 4,5cm stand is good for a long neck. The long collar allows for a very nice look, especially on sports blazers. We advise to wear this collar with collar stiffeners in order to maintain the shape. Ideal for customers with a large physique.", "url": ""},
    {"name": "Medium Cutaway, low stand.", "desc": "This is our bestseller, especially in the business environment. Looks very neat with a tie, and also without. Suitable for a normal to strong neck.", "url": ""},
    {"name": "Medium Cutaway, med stand.", "desc": "The slightly elevated stand is good for customers with a slim. Excellent Business collar, brother to the KR300.", "url": ""},
    {"name": "Italian Spread.", "desc": "This collar is the modern style- tie collar. It requires a medium to large tie know, but excels through its good looks and horizontal lines. Very good for slim customers with a slim neck.", "url": ""},
    {"name": "Wing Collar.", "desc": "Classic Collar for a tuxedo shirt. It is designed to present the bow tie in a classic interpretation.", "url": ""},
    {"name": "Stand-Up Collar", "desc": "This collar does not have an upper collar and creates the “Chinese” or “Mandarin” look. Looks very good on linen shirts. Because it has less layers around the collar it feels cooler, as well.", "url": "a"},
    {"name": "Hidden Button Down.", "desc": "A refined version of the classic button down. The smaller button that keeps the collar to stand upright is tied up underneath the top collar. This means the collar doesn’t show any button or button hole on the outside. A very elegant solution.", "url": ""},
    {"name": "Small Button Down Collar.", "desc": "A small surface, modern-type button down collar that is very popular. It looks very smart..", "url": ""},
  ];

  private selectedCollar: any = {};
  private isSelectedCollar: boolean = false;  

  constructor(private shirtBuilderService: ShirtBuilderService) { }

  public ngOnInit(): void {
    this.selectedCollar = this.shirtBuilderService.suit.collar;
    this.isSelectedCollar = this.shirtBuilderService.isCollarSelected;
  }

  public ngAfterViewInit(): void {
    this.MainFocus.first.nativeElement.focus();
  }

  private SelectCollar(collar: any) {
    this.selectedCollar = collar;
    this.isSelectedCollar = true;
  }

  private Previous(): void {
    this.shirtBuilderService.SetWizardStage.emit(WizardStage.Fabric);
  }

  private Next(): void {
      this.shirtBuilderService.suit.collar = this.selectedCollar;
      this.shirtBuilderService.isCollarSelected = this.isSelectedCollar;
      this.shirtBuilderService.SetDesignStage.emit(DesignStage.Sleeve);
  }
}
