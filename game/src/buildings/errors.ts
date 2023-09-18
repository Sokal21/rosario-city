export class BuildingDestroyed extends Error {
    constructor(public buildingId: number, public buildingName: string) {
        super("This building has been destroyed");
    }
}