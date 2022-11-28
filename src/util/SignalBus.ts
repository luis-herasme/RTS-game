export abstract class Signal {
    constructor(...args: any[]) {}
}

type SignalClass<T extends Signal> = typeof Signal & (new (...args: any[]) => T);

class SignalBus {
    private listeners: Map<Function, ((signal: any) => void)[]> = new Map();

    on<T extends Signal>(signalClass: SignalClass<T>, listener: (signal: T) => void) {
        if (!this.listeners.has(signalClass)) {
            this.listeners.set(signalClass, []);
        }
        this.listeners.get(signalClass)?.push(listener);
    }

    off<T extends Signal>(signalClass: SignalClass<T>, listener: (signal: T) => void) {
        const listeners = this.listeners.get(signalClass);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }

    emit<T extends Signal>(signal: T) {
        const listeners = this.listeners.get(signal.constructor);
        if (listeners) {
            for (let i = listeners.length - 1; i >= 0; i--) {
                listeners[i].call(this, signal);
            }
        }
    }

    once<T extends Signal>(signalClass: SignalClass<T>, listener: (signal: T) => void) {
        const _this = this;
        this.on(signalClass, function g(signal: T) {
            _this.off(signalClass, g);
            listener.call(_this, signal);
        });
    }
}

export const signalBus = new SignalBus();
