import { IUnit, UnitId } from "./units/unit"

export interface IArmy {
    unit: Record<UnitId, IUnit>;
    amount: number;
}

export class Army implements IArmy {
    constructor(
        public unit: Record<UnitId, IUnit>,
        public amount: number,
    ) {
    }

}