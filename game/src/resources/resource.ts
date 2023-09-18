import { EventEmitter } from "../events/index";
import { InsuficientResource } from "../errors";

export type ResourceId = string;

export interface IResource {
    id: ResourceId;
    amount: number;
    productionRate: number;
    limit: number;
    lastTimeCalculated: Date;

    changeProductionRate(rate: number): void;
    changeProductionLimit(limit: number): void;

    calculate(): void
    consume(amount: number): void
    hasSuficient(amount: number): void
}

export class Resource implements IResource {
    constructor(
        public id: string,
        public amount: number,
        public productionRate: number,
        public limit: number,
        public lastTimeCalculated: Date,
        private eventEmmiter: EventEmitter,
    ) {
    }

    changeProductionLimit(limit: number) {
        this.calculate();
        this.limit += limit;

        this.update();
    }

    changeProductionRate(rate: number) {
        this.calculate();
        this.productionRate += rate;

        this.update();
    }

    calculate(): void {
        const now = new Date();

        this.amount = Math.min(
            this.limit,
            ((now.getTime() / 1000) - (this.lastTimeCalculated.getTime() / 1000)) * this.productionRate + this.amount
        );

        this.lastTimeCalculated = now;

        // TODO:  Ver si esto es necesario
        // this.update();
    }

    update() {
        this.eventEmmiter.emitEvent({
            type: "updateResource",
            payload: this,
        })
    }

    hasSuficient(amount: number) {
        this.calculate();
        if (amount > this.amount) {
            throw new InsuficientResource(this.id, amount)
        }
    }

    consume(amount: number): void {
        this.hasSuficient(amount);
        this.amount -= amount;

        this.update();
    }
}