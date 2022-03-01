import Block from "./Block"
import { BLOCK_DEFAULT_SIZE } from "./constants/constants"
import FPS from "./FPSManager"
import Scene from "./Scene"
import Vector from "./Vector"

class Camera {
    public position: Vector = new Vector(0, 0)
    private velocity: Vector = new Vector(0, 0)
    private acceleration: Vector = new Vector(0, 0)
    private inertia: number = 1
    private friction: number = 0.95
    private scene: Scene

    constructor(scene: Scene) {
        this.scene = scene
    }

    public setCenterAtBlock(block: Block): void {
        this.position.x = -block.absolutePosition.x + window.innerWidth / 2 - BLOCK_DEFAULT_SIZE / 2
        this.position.y = -block.absolutePosition.y + window.innerHeight / 2 - BLOCK_DEFAULT_SIZE / 2
    }

    public update(): void {
        this.updatePhysics()
        this.updateBlocksRelativePosition()
    }

    public addForce(force: Vector): void {
        this.acceleration.add(Vector.mult(1 / this.inertia, force))
    }

    public updatePhysics(): void {
        if (FPS.frameTime !== 0) {
            this.position = Vector.add(this.position, Vector.mult((60 * FPS.frameTime/1000), this.velocity))
            this.velocity.add(this.acceleration)
            this.velocity.mult(this.friction)
            this.acceleration.zero()
        }
    }

    public updateBlocksRelativePosition(): void {
        this.scene.eachBlock((block: Block) => {
            block.positionRelativeToCamera = Vector.add(block.absolutePosition, this.position)
        })
    }
}

export default Camera
