import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    images: string[];

    constructor() {
        this.images = ["../assets/alex-logo.png", "../assets/alex-logo.png", "../assets/alex-logo.png"];
    }

    ngOnInit() {
    }

    giefImages(image: string): any {
        return {'background': 'url("' + image + '") no-repeat scroll center center / 80px 80px'};
    }


}
