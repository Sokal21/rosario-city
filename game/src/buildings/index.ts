export type BuildingId = number;

export interface IBuilding {
    id: BuildingId;
    lat: number;
    lng: number;
    name: string
    icon: string;
    level: number;
    hitPoints: number;

    getDamage(amount: number): void;
}