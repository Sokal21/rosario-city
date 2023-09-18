import { BuildingId } from "../buildings/index"
import { IProductiveBuilding } from "../buildings/productive"
import { UnexistantResource } from "../errors"
import { IResource, ResourceId } from "../resources/resource"
import { ResourceConsumption } from "../resources/structures"

export interface IProductiveDomain {
    resources: Record<ResourceId, IResource>;
    buildings: Record<BuildingId, IProductiveBuilding>;

    addBuilding(productiveBuilding: IProductiveBuilding): void;
    damageBuilding(buildingId: BuildingId, amount: number): void;
    upgradeBuilding(buildingId: BuildingId): void;
    consumeResource(resourceConsumption: ResourceConsumption[]): void;
}

export class ProductiveBuilding implements IProductiveDomain {
    constructor(
        public resources: Record<ResourceId, IResource>,
        public buildings: Record<BuildingId, IProductiveBuilding>,
    ) {
    }

    addBuilding(productiveBuilding: IProductiveBuilding): void {
        throw new Error("Method not implemented.")
    }
    damageBuilding(buildingId: BuildingId): void {
        throw new Error("Method not implemented.")
    }
    upgradeBuilding(buildingId: BuildingId): void {
        throw new Error("Method not implemented.")
    }

    consumeResource(resourceConsumption: ResourceConsumption[]): void {
        for (let index = 0; index < resourceConsumption.length; index++) {
            const resCons = resourceConsumption[index];

            const res = this.resources[resCons.resourceId];

            if (!res) {
                throw new UnexistantResource(resCons.resourceId);
            }

            res.hasSuficient(resCons.amount)
        }

        for (let index = 0; index < resourceConsumption.length; index++) {
            const resCons = resourceConsumption[index];
            const res = this.resources[resCons.resourceId];

            res.consume(resCons.amount);
        }
    }
}