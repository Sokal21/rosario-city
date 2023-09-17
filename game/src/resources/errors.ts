export class InsuficientResource extends Error {
    constructor(public resourceId: string, public amount: number) {
        super("Insuficient resources")
    }
}