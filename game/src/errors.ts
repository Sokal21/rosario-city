export class InsuficientResource extends Error {
    constructor(public resourceId: string, public amount: number) {
        super("Insuficient resources")
    }
}

export class BuildingDestroyed extends Error {
    constructor(public buildingId: number, public buildingName: string) {
        super("This building has been destroyed");
    }
}

export class UnexistantResource extends Error {
    constructor(public resourceId: string) {
        super("This resource does not exist");
    }
}