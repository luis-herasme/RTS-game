export class EventBus<ReadTypes extends { type: string }, WriteTypes extends { type: string }> {
    private readonly listeners: Map<string, ((signal: any) => void)[]> = new Map();

    public read<T extends ReadTypes['type']>(
        messageType: T,
        listener: (signal: Extract<ReadTypes, { type: T }>) => void
    ) {
        if (!this.listeners.has(messageType)) {
            this.listeners.set(messageType, []);
        }
        this.listeners.get(messageType)?.push(listener);
    }

    public emit(message: WriteTypes) {
        const listeners = this.listeners.get(message.type);
        if (listeners) {
            for (let i = listeners.length - 1; i >= 0; i--) {
                listeners[i].call(this, message);
            }
        }
    }
}
