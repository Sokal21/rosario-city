import { IStructure } from "estructures";
import { LatLng } from "leaflet";
import { Farm } from "./farm";
import { Bullets, Money, Resource } from "resources";

export interface BuildingCost {
    building: (marker: LatLng) => IStructure,
    buildingTimeInSeconds: number,
    cost: {
        resource: Resource,
        amount: number,
    }[],
}

const defaults: BuildingCost[] = [
    {
        building: (LatLng) => new Farm(Bullets, LatLng.lat, LatLng.lng),
        buildingTimeInSeconds: 20,
        cost: [
            {
                resource: Money,
                amount: 100
            }
        ]
    }
]

export class Builder {

    constructor() {

    }

    getAvailableBuildings(marker: LatLng | null): BuildingCost[] {
        if (marker === null) {
            return []
        }

        return defaults
    }
}