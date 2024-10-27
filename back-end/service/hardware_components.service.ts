import hardware_componentsDb from "../repository/hardware_components.db";
import { Hardware_Components } from "../model/hardware_components";

const getAllHardwareComponents = (): Hardware_Components[] => {
    return hardware_componentsDb.getAllHardwareComponents();
};

const getHardwareComponentByName = ({ name }: { name: string }): Hardware_Components | null => {
    return hardware_componentsDb.getHardwareComponentByName({ name });
};

export default { getAllHardwareComponents, getHardwareComponentByName };
