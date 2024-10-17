export class Hardware_Components {
    readonly Name: String;
    readonly Details: String;

    constructor(hardware_component: { Name: String; Details: String }) {
        this.Name = hardware_component.Name;
        this.Details = hardware_component.Details;
    }
}

