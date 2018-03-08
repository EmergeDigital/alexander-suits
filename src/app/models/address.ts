export class Address {
    address: string;
    address2: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
  
    constructor(init: any) {
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }
    }
  }
  