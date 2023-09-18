import { BuildingDestroyed } from "../errors";
import { EventEmitter } from "../events/index";
import { IBuilding } from "./index";

export interface IProductiveBuilding {
    resourceId: string;

    onCreate(): number
    onDestroy(): number
    onUpgrade(): number
}

export class StandardProductiveBuilding implements IBuilding, IProductiveBuilding {
    constructor(
        public id: number,
        public lat: number,
        public lng: number,
        public name: string,
        public icon: string,
        public level: number,
        public hitPoints: number,
        public resourceId: string,
        private eventEmmiter: EventEmitter,
    ) {
    }

    private productionByLevelRate(): number {
        return (this.level + 1) * 5
    }

    onCreate(): number {
        return this.productionByLevelRate();
    }
    onDestroy(): number {
        return this.productionByLevelRate();
    }
    onUpgrade(): number {
        this.level++;
        this.update();

        return this.productionByLevelRate();
    }

    update() {
        this.eventEmmiter.emitEvent({
            type: "updateBuilding",
            payload: this,
        })
    }

    getDamage(amount: number): void {
        this.hitPoints = -amount;

        this.update()

        if (this.hitPoints <= 0) {
            throw new BuildingDestroyed(this.id, this.name);
        }
    }
}