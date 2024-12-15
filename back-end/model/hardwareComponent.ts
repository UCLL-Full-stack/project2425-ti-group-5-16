import { HardwareComponent as HardwareComponentPrisma } from '@prisma/client';

export class HardwareComponent {
    private id?: number; // Changed from name to id
    private name: string;
    private details: string;
    private price: number;

    constructor(hardware: { id?: number; name: string; details: string; price: number }) {
        this.id = hardware.id;
        this.name = hardware.name;
        this.details = hardware.details;
        this.price = hardware.price;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): String {
        const name = this.name;
        if (name === undefined) {
            throw new Error('Name is undefined');
        }
        return this.name;
    }

    getDetails(): String {
        const details = this.details;
        if (details === undefined) {
            throw new Error('Details is undefined');
        }
        return this.details;
    }

    getPrice(): number {
        const price = this.price;
        if (price === undefined) {
            throw new Error('Price is undefined');
        }
        return this.price;
    }

    // SETTERS

    setDetails(details: string) {
        this.details = details;
    }

    setPrice(price: number) {
        this.price = price;
    }

    equals(hardware_component: HardwareComponent): boolean {
        return (
            this.name === hardware_component.getName() &&
            this.details === hardware_component.getDetails() &&
            this.price === hardware_component.getPrice()
        );
    }

    static from({ id, name, details, price }: HardwareComponentPrisma) {
        return new HardwareComponent({
            id,
            name,
            details,
            price,
        });
    }
}
