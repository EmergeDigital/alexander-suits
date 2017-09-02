import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {DataService} from "../../services/data.service";
import {Product} from "../../models/product";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    mapOptions: object;
    address: string;
    email: string;
    cell: string;

    current_products: Product[];

    constructor(public snackBar: MdSnackBar,
                public data: DataService) {
        this.mapOptions = {
            zoom: 15,
            styles: [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
            }, {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
            }, {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#000000"}, {"lightness": 20}]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
            }, {
                "featureType": "administrative.country",
                "elementType": "geometry.fill",
                "stylers": [{"saturation": "-4"}, {"lightness": "48"}, {"gamma": "1.00"}, {"weight": "0.93"}]
            }, {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [{"visibility": "simplified"}, {"saturation": "41"}]
            }, {
                "featureType": "administrative.country",
                "elementType": "labels.text.stroke",
                "stylers": [{"lightness": "10"}]
            }, {
                "featureType": "administrative.province",
                "elementType": "geometry.fill",
                "stylers": [{"lightness": "-34"}, {"gamma": "1.33"}, {"weight": "2.68"}]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 20}]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 21}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#000000"}, {"lightness": 17}]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 18}]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 16}]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 19}]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [{"saturation": "69"}]
            }, {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [{"saturation": "45"}, {"hue": "#ff0000"}, {"gamma": "1.28"}, {"lightness": "90"}, {"weight": "9.38"}]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#000000"}, {"lightness": 17}]
            }]
        };

        data.getProducts().then(products => {
            this.current_products = products;
        });

        this.address = "Alexander Suits (Pty) Ltd., 2nd Floor Tattersalls Building, Albert Street, Johannesburg";
        this.email = "info@alexandersuits.com";
        this.cell = "011 492 33604";
    }

    ngOnInit() {
    }

    copyLocation() {
        this.snackBar.open("Address copied to clipboard!", "", {duration: 2000});
    }

    copied() {
        this.snackBar.open("Copied to clipboard!", "", {duration: 2000});
    }

    doesNothing() {
        this.snackBar.open("This does nothing at the moment!", "", {duration: 2000});
    }

}
