import { InsuficientResource } from "./errors";

export class Resource {
    callbacks: Array<(amount: number) => void> = [];

    constructor(
        private name: string,
        public current = 0,
    ) {
    }

    addCallback(cb: (amount: number) => void) {
        this.callbacks.push(cb);
    }

    expend(amount: number) {
        if (this.current >= amount) {
            this.current = - amount;

            this.callbacks.forEach((cb) => cb(this.current))
        } else {
            throw new InsuficientResource(amount, this.name)
        }
    }

    produce(amount: number) {
        this.current += amount;
        this.callbacks.forEach((cb) => cb(this.current))
    }
}

export const Bullets = new Resource("bullets", 0);
export const Money = new Resource("money", 0);
export const Power = new Resource("power", 0);
export const Dope = new Resource("dope", 0);
