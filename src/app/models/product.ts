export class Product {

    name: string;
    description: string;
    category: string;
    price: number;
    extras: any;
    count: number = 1;
    customisation: any;
    image_urls: string[];
    product_SKU: string;
    article_number: string;
    colour_number: string;
    description_long: string;
    print: string;
    print_type: string;
    primary_colour: string;
    secondary_colours: string[];
    fabric_type: string;
    fabric_subtype: string;
    weave_description: string;
    collections: string[];
    price_category: string;
    estimated_stock_remaining: number;



    constructor(init: any) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
}
