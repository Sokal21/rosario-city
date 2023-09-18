export interface Event {
    type: string;
    payload: any;
}

export interface EventEmitter {
    emitEvent(event: Event): void;
}