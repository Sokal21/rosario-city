import { InsuficientResource } from "./errors";

export interface IResource {
    id: string;
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
        private eventEmmiter: any, // TODO: REVIEW
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
        // TODO: ver como se hace esto bien
        this.eventEmmiter({
            type: "updateResource",
            resource: this,
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