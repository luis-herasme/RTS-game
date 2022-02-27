import Player from "./Player"
import Vector from "./Vector"
import Renderable from "./Renderable"
import { isTextureDefined, NONE_PLAYER } from "./constants"
import { BlockDataValidToAPlayer, Visibility } from "./StateManager/stateManagementTypes"

class Block extends Renderable {

    public absolutePosition: Vector
    public x: number
    public y: number
    public type: string

    // Visibility
    public seen: boolean = false
    public typeSeen: string = ""
    public visibility: Visibility = Visibility.hidden

    // Conquer block
    public canBeConquer: boolean = true
    public population: number = 0

    public owner: Player = NONE_PLAYER
    public ownerName: string = ""
    public ship: boolean = false

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

    public set level(value: number) {
    }

    public updateState(data: BlockDataValidToAPlayer): void {
        this.population = data.population
        this.ownerName = data.ownerName
        this.level = data.level
        this.ship = data.ship
        this.visibility = data.visibility

        if (data.ownerName !== "NONE") {
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
            if (this.owner.name == "NONE") {  //* TEMPORAL MEDIR RENDIMIENTO
                this.drawTile(this.type)
            }
            // If the block has a owner draw a rect with the owner color
            // if (this.owner.name !== "NONE") {
            if (this.color) {
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
