export class Lining {
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    lining_SKU: string;
    article_number: string;
    colour_number: string;
    description_long: string;
    print: string;
    primary_colour: string;
    estimated_stock_remaining: number;

    constructor(init: any) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
}
    