import Block from "./Block"
import { FORCE } from "./constants"
import Cursor from "./Cursor"
import Vector from "./Vector"

class Camera {
    private _position: Vector = new Vector(0, 0)
    private velocity: Vector = new Vector(0, 0)
    private acceleration: Vector = new Vector(0, 0)
    private inertia: number = 1
    private friction: number = 0.9
    private map: Array<Array<Block>>
    

    constructor(map: Array<Array<Block>>) {
        this.map = map
        this.startCameraMovementEvent()
        
    }

    public get position(): Vector {
        return this._position
    }

    public set position(newPosition: Vector) {
        this._position = newPosition
        this._position.x = Math.round(this._position.x)
        this._position.y = Math.round(this._position.y)
        
        this.map.forEach(x => {
            x.forEach(block => {
                block.positionRelativeToCamera = Vector.add(block.position, this._position)
            })
        })
    }

    private addForce(force: Vector): void {
        this.acceleration.add(Vector.mult(1 / this.inertia, force))
    }

    public update(): void {
        this.position = Vector.add(this.position, this.velocity)
        this.velocity.add(this.acceleration)
        this.velocity.mult(this.friction)
        this.acceleration.zero()
    }

    private startCameraMovementEvent() {
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLocaleLowerCase()

            if (key === 'w') {
                this.addForce(new Vector(0, FORCE))
            }
            else if (key === 's') {
                this.addForce(new Vector(0, -FORCE))
            }
            else if (key === 'd') {
                this.addForce(new Vector(-FORCE, 0))
            }
            else if (key === 'a') {
                this.addForce(new Vector(FORCE, 0))
            }
        })
    }
}

export default Camera
