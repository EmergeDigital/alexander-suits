import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    images: string[];

    constructor() {
        this.images = ["../assets/accessories.jpg", "../assets/business.jpg", "../assets/suit-up.jpg"];
    }

    ngOnInit() {
    }

    giefImages(image: string): any {
        return {'background': 'url("' + image + '") no-repeat scroll center center'};
    }


}
