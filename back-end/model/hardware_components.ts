export class Hardware_Components {
    readonly Name: String;
    readonly Details: String;

    constructor(hardware_component: { Name: String; Details: String }) {
        this.Name = hardware_component.Name;
        this.Details = hardware_component.Details;
    }

    getName(): String {
        return this.Name;
    }

    getDetails(): String {
        return this.Details;
    }

    equals(hardware_component: Hardware_Components): boolean {
        return (
            this.Name === hardware_component.getName() &&
            this.Details === hardware_component.getDetails()
        );
    }
    
}

