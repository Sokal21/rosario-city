import { EventEmitter } from "../events/index";

export type UnitId = string;

export interface IUnit {
    id: UnitId;
    defense: number;
    attack: number;
    speed: number;
    hitPoints: number;

    getDamage(amount: number): void;
    destroy(): void;

}

export class Unit implements IUnit {
    constructor(
        public id: string,
        public defense: number,
        public attack: number,
        public speed: number,
        public hitPoints: number,
        private eventEmmiter: EventEmitter,
    ) {
    }

    getDamage(amount: number): void {
        this.hitPoints = -amount;


        if (this.hitPoints <= 0) {
            this.destroy();
        }
    }

    destroy(){
        // DEBERIAMOS BORRAR EL OBJETO, EMITIR UN EVENTO.
    }
}