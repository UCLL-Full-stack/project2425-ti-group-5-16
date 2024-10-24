export class Hardware_Components {
    private name: String;      // Primary key
    private details: String;   
    private price: number;     

    constructor(hardware_component: { name: String; details: String; price: number; }) {
        this.name = hardware_component.name;
        this.details = hardware_component.details;
        this.price = hardware_component.price;
    }

    // GETTERS

    getName(): String {
        return this.name;
    }

    getDetails(): String {
        return this.details;
    }

    getPrice(): number {
        return this.price;
    }
    
    // SETTERS

    setName(name: String) {
        this.name = name;
    }

    setDetails(details: String) {
        this.details = details;
    }

    setPrice(price: number) {
        this.price = price;
    }
}

