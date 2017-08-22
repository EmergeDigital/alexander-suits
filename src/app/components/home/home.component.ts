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
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum magna at mauris dignissim consectetur."
          },
          {
            name: "Hawthorn Williams",
            text: "I would buy a suit every day of the week"
          },
          {
            name: "José Luis",
            text: "Que? No hablo Anglais"
          },
          {
            name: "Quagmire Peter",
            text: "You can never go wrong"
          },
          {
            name: "Lorem Ipsum",
            text: "This is placeholder text"
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
              items: 3
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
