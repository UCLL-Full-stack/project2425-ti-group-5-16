import { HardwareComponent as HardwareComponentPrisma } from '@prisma/client';
import { Setup } from './setup';
import { User } from './user';

export class Hardware_Components {
    private name: String; // Primary key
    private details: String;
    private price: number;

    constructor(hardware_component: { name: String; details: String; price: number }) {
        this.name = hardware_component.name;
        this.details = hardware_component.details;
        this.price = hardware_component.price;
    }

    // GETTERS

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

    setDetails(details: String) {
        this.details = details;
    }

    setPrice(price: number) {
        this.price = price;
    }

    equals(hardware_component: Hardware_Components): boolean {
        return (
            this.name === hardware_component.getName() &&
            this.details === hardware_component.getDetails() &&
            this.price === hardware_component.getPrice()
        );
    }

    // Methods to interact with Setup and User
    static fromai(hardwareComponentPrisma: HardwareComponentPrisma): Hardware_Components {
        return new Hardware_Components({
            name: hardwareComponentPrisma.name,
            details: hardwareComponentPrisma.details,
            price: hardwareComponentPrisma.price,
        });
    }

    static from({
        name,
        details,
        price,
    }: HardwareComponentPrisma & {
        name: string;
        details: string;
        price: number;
    }) {
        return new Hardware_Components({
            name: name,
            details: details,
            price: price,
        });
    }
}
