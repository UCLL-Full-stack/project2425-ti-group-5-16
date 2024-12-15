import { HardwareComponent } from '../model/hardwareComponent';
import hardwareComponentDB from '../repository/hardwareComponent.db';

const getAllHardwareComponents = async (): Promise<HardwareComponent[]> =>
    hardwareComponentDB.getAllHardwareComponents();

const getHardwareComponentByName = async ({
    name,
}: {
    name: string;
}): Promise<HardwareComponent | null> => {
    const hardwareComponent = await hardwareComponentDB.getHardwareComponentByName({ name });
    if (!hardwareComponent) {
        throw new Error(`Hardware component with name: ${name} does not exist.`);
    }
    return hardwareComponent;
};

export default { getAllHardwareComponents, getHardwareComponentByName };
