import { IProductiveStructure } from "estructures";
import { Resource } from "resources";

export class Farm implements IProductiveStructure {
    name: string = "Farm";

    constructor(
        readonly resource: Resource,
        public latitude: number,
        public longitude: number,
        public level = 0,
    ) {
    }

    upgrade(): void {
        this.level++;
    }

    produce(): number {
        return 5 + this.level * 3;
    }
}