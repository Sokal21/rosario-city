export interface IBuilding {
    id: number;
    lat: number;
    lng: number;
    name: string
    icon: string;
    level: number;
    hitPoints: number;

    getDamage(amount: number): void;
}