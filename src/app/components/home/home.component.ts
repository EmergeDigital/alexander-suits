import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    images: string[];
    testimonials: object[];
    testimonialOptions: object;

    constructor() {
        this.images = ["../assets/accessories.jpg", "../assets/business.jpg", "../assets/suit-up.jpg"];
        this.testimonials = [
          {
            name: "Jim Johnson",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum magna at mauris dignissim consectetur.",
            title: "Chief Person"
          },
          {
            name: "Hawthorn Williams",
            text: "I would buy a suit every day of the week",
            title: "Chief Person"
          },
          {
            name: "José Luis",
            text: "Que? No hablo Anglais",
            title: "Chief Person"
          },
          {
            name: "Quagmire Peter",
            text: "You can never go wrong",
            title: "Chief Person"
          },
          {
            name: "Lorem Ipsum",
            text: "This is placeholder text",
            title: "Chief Person"
          }
        ];
        this.testimonialOptions = {
          dots: true,
          navigation: true,
          autoplay: true,
          loop: true,
          autoplayTimeout:5500,
          responsiveClass:true,
          responsive: {
            0 : {
              items: 1
            },
            1000 : {
              items: 1
            }
          }
        };
    }

    ngOnInit() {
    }

    giefImages(image: string): any {
        return {'background': 'url("' + image + '") no-repeat scroll center center'};
    }


}
