import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { Product } from "../../models/product";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    private address: string = "";
    private email: string = "send us an email";
    private cell: string = "give us a call";

    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig, public data: DataService) {
        this.address = "Alexander Suits (Pty) Ltd., 2nd Floor Tattersalls Building, Albert Street, Johannesburg";
    }

    public ngOnInit(): void {
    }

    private Call(): void {
        if (/Android|iPhone/i.test(window.navigator.userAgent))
            window.open("tel:+27114923360", "_blank");
    }

    private Email(): void {
        if (/Android|iPhone/i.test(window.navigator.userAgent))
            window.open("mailto:info@alexandersuits.com", "_blank");
    }

    private OpenLocation(): void {
        window.open("https://maps.google.com/?q=Alexander Suits (Pty) Ltd., 2nd Floor Tattersalls Building, Albert Street, Johannesburg", "_blank");
    }

}
