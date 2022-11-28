import Renderable from './Renderable';
import { Signal, signalBus } from './util/SignalBus';
import Vector from './Vector';

export class MouseDown extends Signal {
    constructor() {
        super();
    }
}

export class MouseDrag extends Signal {
    constructor(readonly displacement: Vector) {
        super();
    }
}

export class MouseUp extends Signal {
    constructor(readonly clickDuration: number, readonly displacementFromDrag: number) {
        super();
    }
}

export class Wheel extends Signal {
    constructor(readonly mouseDisplacement: Vector, readonly deltaY: number) {
        super();
    }
}

class MouseEvents {
    private mouseIsDown = false;
    private mouseUpPosition = new Vector(0, 0);
    private mouseMovePosition = new Vector(0, 0);
    private mouseDownPosition = new Vector(0, 0);
    private mousedownTime: number = 0;
    private mouseDragPosition: Vector = new Vector(0, 0);
    private displacementFromDrag: number = 0;

    constructor() {
        this.listenToEvents();
    }

    public getMouseIsDown() {
        return this.mouseIsDown;
    }

    public getMouseUpPosition() {
        return this.mouseUpPosition.copy();
    }

    public getMouseMovePosition() {
        return this.mouseMovePosition.copy();
    }

    public getMouseDownPosition() {
        return this.mouseDownPosition.copy();
    }

    private listenToEvents() {
        document.addEventListener('wheel', this.whell);
        document.addEventListener('mousedown', this.mouseDown);
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    private mouseDown = (event: MouseEvent) => {
        this.mouseDownPosition.x = event.clientX;
        this.mouseDownPosition.y = event.clientY;
        this.mouseIsDown = true;
        this.mousedownTime = Date.now();
        this.mouseDragPosition = this.mouseDownPosition.copy();
        this.displacementFromDrag = 0;

        signalBus.emit(new MouseDown());
    };

    private mouseMove = (event: MouseEvent) => {
        this.mouseMovePosition.x = event.clientX;
        this.mouseMovePosition.y = event.clientY;

        // Mouse drag
        if (this.mouseIsDown) {
            const displacement = Vector.sub(this.mouseMovePosition, this.mouseDragPosition);
            this.mouseDragPosition = this.mouseMovePosition.copy();
            this.displacementFromDrag += Vector.mag(displacement);
            signalBus.emit(new MouseDrag(displacement));
        }
    };

    private mouseUp = (event: MouseEvent) => {
        this.mouseUpPosition.x = event.clientX;
        this.mouseUpPosition.y = event.clientY;
        this.mouseIsDown = false;

        const clickDuration = Date.now() - this.mousedownTime;
        signalBus.emit(new MouseUp(clickDuration, this.displacementFromDrag));
    };

    private whell = (event: WheelEvent) => {
        const initialScale = Renderable.scale;
        let newScale;
        const initialPosition = new Vector(
            this.mouseMovePosition.x / Renderable.scale,
            this.mouseMovePosition.y / Renderable.scale
        );

        if (event.deltaY > 0) {
            newScale = initialScale * 0.9;
        } else {
            newScale = initialScale * 1.1;
        }

        const finalPosition = new Vector(this.mouseMovePosition.x / newScale, this.mouseMovePosition.y / newScale);
        const mouseDisplacement = Vector.sub(initialPosition, finalPosition);
        Renderable.scale = newScale;

        signalBus.emit(new Wheel(mouseDisplacement, event.deltaY));
    };
}

export const mouseEvents = new MouseEvents();
