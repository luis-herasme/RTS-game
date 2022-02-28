import Vector from "./Vector"
import Renderable from "./Renderable"
import { isTextureDefined, NONE_PLAYER } from "./constants"
import { BlockDataValidToAPlayer, Visibility } from "./StateManager/stateManagementTypes"

class Block extends Renderable {
    public ownerName: string = NONE_PLAYER.name
    public population: number = 0
    public absolutePosition: Vector
    public x: number
    public y: number
    public type: string
    public ship: boolean = false

    // Visibility
    private seen: boolean = false
    private typeSeen: string = ""
    private visibility: Visibility = Visibility.hidden

    constructor(position: Vector, size: Vector, x: number, y: number, type: string) {
        super(position, size)
        this.x = x
        this.y = y
        this.absolutePosition = position
        this.type = type
    }

    public get level(): number {
        return 0
    }

    public set level(value: number) { }

    public updateState(data: BlockDataValidToAPlayer): void {
        this.ownerName = data.ownerName
        this.population = data.population
        this.level = data.level
        this.ship = data.ship
        this.visibility = data.visibility

        if (data.ownerName !== NONE_PLAYER.name) {
            this.color = data.color
        } else {
            this.color = ""
        }

        this.seen = true
        this.typeSeen = this.type
    }

    public drawFog(): void {
        if (this.seen) {
            // Translucid fog
            this.drawRect(false, "rgba(0,0,0, 0.75)")
        }
        else {
            // Fog
            this.drawRect(false, "rgb(17, 17, 17)")
        }
    }

    public render(): void | null {
        if (this.visibility == Visibility.hidden) {
            // If this tile has been seen draw a block 
            if (this.seen) {
                this.drawTile(this.typeSeen)
                if (isTextureDefined(this.typeSeen + "_L2")) {
                    this.drawTile(this.typeSeen + "_L2")
                }
            }
            // Draw fog, if it's a block that has been seenm, the fog will be translucid
            this.drawFog()
        }
        else {
            // Draw the sprite of this block type
            if (this.ownerName == NONE_PLAYER.name) {
                this.drawTile(this.type)
            }
            // If the block has a owner draw a rect with the owner color
            if (this.color && this.ownerName !== NONE_PLAYER.name) {
                this.drawRect(false)
            }

            if (isTextureDefined(this.type + "_L2")) {
                this.drawTile(this.type + "_L2")
            }

            if (this.ship) {
                this.drawTile("BOAT_LEFT_L2")
            }

            if ((this.population !== 0)) {
                this.drawText(String(this.population))
            }

            // Draw tile border
            this.drawRect(true)
        }
    }
}

export default Block
