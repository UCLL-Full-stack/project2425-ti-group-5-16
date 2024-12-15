import { HardwareComponent } from './hardwareComponent';

// Define or import HardwareComponentToSetupPrisma
import {
    HardwareComponent as HardwareComponentPrisma,
    HardwareComponentToSetup as HardwareComponentToSetupPrisma,
} from '@prisma/client';

export class HardwareComponentToSetup {
    private hardwareComponentId: string;
    private setupId: number;
    private hardwareComponent: HardwareComponent;

    constructor(data: {
        hardwareComponentId: string;
        setupId: number;
        hardwareComponent: HardwareComponent;
    }) {
        this.hardwareComponentId = data.hardwareComponentId;
        this.setupId = data.setupId;
        this.hardwareComponent = data.hardwareComponent;
    }

    // GETTERS

    getHardwareComponentId(): string {
        return this.hardwareComponentId;
    }

    getSetupId(): number {
        return this.setupId;
    }

    getHardwareComponent(): HardwareComponent {
        return this.hardwareComponent;
    }

    // METHODS

    equals(hardwareComponentToSetup: HardwareComponentToSetup): boolean {
        return (
            this.hardwareComponentId === hardwareComponentToSetup.getHardwareComponentId() &&
            this.setupId === hardwareComponentToSetup.getSetupId()
        );
    }

    // Add from method
    /*
    static from(prismaData: HardwareComponentToSetupWithRelations): HardwareComponentToSetup {
        return new HardwareComponentToSetup({
            hardwareComponentId: prismaData.hardwareComponentId,
            setupId: prismaData.setupId,
            hardwareComponent: HardwareComponent.from(prismaData.hardwareComponent),
        });
    }*/
}
