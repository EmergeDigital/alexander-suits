import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    images: string[];
    testimonials: object[];

    constructor() {
        this.images = ["../assets/accessories.jpg", "../assets/business.jpg", "../assets/suit-up.jpg"];
        this.testimonials = [
          {
            name: "Jim Johnson",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum magna at mauris dignissim consectetur."
          },
          {
            name: "James Williams",
            text: "I would buy a suit every day of the week"
          },
          {
            name: "José Luis",
            text: "Que? No hablo Anglais"
          },
          {
            name: "Quigon Jin",
            text: "Do you know which sector we are in?"
          },
          {
            name: "Brodo Faggins",
            text: "The best wares in all of Hobbiton"
          }
        ];
    }

    ngOnInit() {
    }

    giefImages(image: string): any {
        return {'background': 'url("' + image + '") no-repeat scroll center center'};
    }


}
