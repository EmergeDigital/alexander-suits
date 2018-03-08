import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private testimonials: object[] = [];
  private testimonialOptions: object = {};
  private email: string = "send us an email";
  private cell: string = "give us a call";

  constructor(private router: Router) {
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
      autoplayTimeout: 5500,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    };
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

  private OpenSuits(): void {
    this.router.navigate(['/suits']);
  }
}