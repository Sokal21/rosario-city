export class InsuficientResource extends Error {
    constructor(public amount: number, public name: string) {
        super(
            `Cannot expend ${amount} ${name}`
        )
    }
}