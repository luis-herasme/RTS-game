import Block from './Block';
import FPS from './FPSManager';
import Scene from './Scene';
import { signalBus } from './util/SignalBus';
import Vector from './Vector';
import { BLOCK_DEFAULT_SIZE, FORCE } from './constants/constants';
import { MouseDrag, mouseEvents, MouseUp, Wheel } from './MouseEvents';

class Camera {
    public position: Vector = new Vector(0, 0);
    private velocity: Vector = new Vector(0, 0);
    private acceleration: Vector = new Vector(0, 0);
    private inertia: number = 1;
    private friction: number = 0.95;
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
        this.listenToCameraEvents();
    }

    public setCenterAtBlock(block: Block): void {
        this.position.x = -block.absolutePosition.x + window.innerWidth / 2 - BLOCK_DEFAULT_SIZE / 2;
        this.position.y = -block.absolutePosition.y + window.innerHeight / 2 - BLOCK_DEFAULT_SIZE / 2;
    }

    public update(): void {
        this.updatePhysics();
        this.updateBlocksRelativePosition();
    }

    public addForce(force: Vector): void {
        this.acceleration.add(Vector.mult(1 / this.inertia, force));
    }

    public updatePhysics(): void {
        if (FPS.frameTime !== 0) {
            this.position = Vector.add(this.position, Vector.mult((60 * FPS.frameTime) / 1000, this.velocity));
            this.velocity.add(this.acceleration);
            this.velocity.mult(this.friction);
            this.acceleration.zero();
        }
    }

    public updateBlocksRelativePosition(): void {
        this.scene.eachBlock((block: Block) => {
            block.positionRelativeToCamera = Vector.add(block.absolutePosition, this.position);
        });
    }

    private listenToCameraEvents() {
        signalBus.on(MouseDrag, ({ displacement }) => {
            this.position.add(displacement);
        });

        signalBus.on(MouseUp, ({ clickDuration }) => {
            const mouseUpPosition = mouseEvents.getMouseUpPosition();
            const mouseDownPosition = mouseEvents.getMouseDownPosition();

            if (clickDuration < 200) {
                const direction = Vector.sub(mouseUpPosition, mouseDownPosition);
                direction.mult(0.15);
                this.addForce(direction);
            }
        });

        signalBus.on(Wheel, ({ mouseDisplacement }) => {
            this.position.sub(mouseDisplacement);
            this.updateBlocksRelativePosition();
        });

        document.addEventListener('keydown', (e) => {
            const key = e.key.toLocaleLowerCase();

            if (key === 'w') {
                this.addForce(new Vector(0, FORCE));
            } else if (key === 's') {
                this.addForce(new Vector(0, -FORCE));
            } else if (key === 'd') {
                this.addForce(new Vector(-FORCE, 0));
            } else if (key === 'a') {
                this.addForce(new Vector(FORCE, 0));
            }
        });
    }
}

export default Camera;
