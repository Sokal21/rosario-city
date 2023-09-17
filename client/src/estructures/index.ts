import { Resource } from "resources";

export interface IStructure {
    readonly latitude: number;
    readonly longitude: number;
    readonly name: string;
}

export interface IProductiveStructure extends IStructure {
    readonly resource: Resource;
    readonly level: number;

    upgrade(): void;
    produce(): number;
}