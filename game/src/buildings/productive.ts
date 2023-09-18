import { EventEmitter } from "../events/index";
import { BuildingDestroyed } from "./errors";
import { IBuilding } from "./index";

export interface IProductiveBuilding {
    resourceId: string;

    onCreate(): number
    onDestroy(): number
    onUpgrade(): number
}

export class ProductiveBuilding implements IBuilding, IProductiveBuilding {
    constructor(
        public id: number,
        public lat: number,
        public lng: number,
        public name: string,
        public icon: string,
        public level: number,
        public hitPoints: number,
        private eventEmmiter: EventEmitter,
    ) {

    }
    resourceId: string;

    onCreate(): number {
        throw new Error("Method not implemented.");
    }
    onDestroy(): number {
        throw new Error("Method not implemented.");
    }
    onUpgrade(): number {
        throw new Error("Method not implemented.");
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