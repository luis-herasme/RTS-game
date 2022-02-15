import Player from "./Player"
import Vector from "./Vector"
import Settlement from "./Settlement"
import {
    SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP,
    Visibility
} from "./constants"
import Renderable from "./Renderable"
import Scene from "./Scene"
import Cursor from "./Cursor"


class Block extends Renderable {

    // Position    
    private _position: Vector
    private _x: number
    private _y: number

    // Render
    public type: string


    // Visibility
    public seen: boolean = false
    public typeSeen: string = ""
    public nextToPlayer: boolean = false
    private _visibility: Visibility

    // Conquer block
    public canBeConquer: boolean = true
    public border: boolean = false
    private _population: number = 0
    private _owner: Player

    public ship: boolean = false


    public map: Array<Array<Block | Settlement>>

    constructor(position: Vector, size: Vector, x: number, y: number, type: string) {
        super(position, size)
        this._x = x
        this._y = y

        this._position = position
        this.type = type
        this._visibility = Visibility.hidden
    }

    public get visibility(): Visibility {
        return this._visibility
    }

    public set visibility(value: Visibility) {
        if (value == Visibility.visible) {
            this.seen = true
            this.typeSeen = this.type
        }
    
        if (this._owner) {
            this._visibility = Visibility.visible
            if (value == Visibility.hidden) {
                console.warn("Owned blocks cannot be hidden")
            }
        }
        else if (this.nextToPlayer) {
            this._visibility = Visibility.visible
            if (value == Visibility.hidden) {
                console.warn("Blocks next to a player cannot be hidden")
            }
        }
        else {
            this._visibility = value
        }
    }

    public get population(): number {
        return this._population
    }

    public set population(value: number) {
        if (this.ship && value <= 1) {
            this.canBeConquer = false
            this._owner = undefined
            this.color = ""
            this.ship = false
            this.setNextToPlayer(false)
            this.setVisibility(Visibility.hidden)
        }
        this._population = value
    }

    public get x(): number {
        return this._x
    }

    public get y(): number {
        return this._y
    }

    public get position(): Vector {
        return this._position
    }

    public get owner(): Player {
        return this._owner
    }

    public set owner(value: Player) {
        if (this._owner !== undefined) {
            this._owner.removeBlock(this)
        }

        this._owner = value
        this.color = this._owner.color
        this.setVisibility(Visibility.visible)
        this.setNextToPlayer(true)
    }

    public setNextToPlayer(value: boolean): void {
        this.nextToPlayer = value
    
        this.map[this.y][this.x + 1].nextToPlayer = value
        this.map[this.y][this.x - 1].nextToPlayer = value
        this.map[this.y + 1][this.x].nextToPlayer = value
        this.map[this.y - 1][this.x].nextToPlayer = value

        this.map[this.y + 1][this.x + 1].nextToPlayer = value
        this.map[this.y + 1][this.x - 1].nextToPlayer = value
        this.map[this.y - 1][this.x + 1].nextToPlayer = value
        this.map[this.y - 1][this.x - 1].nextToPlayer = value
    }

    public setVisibility(visibility: Visibility): void {
        this.visibility = visibility
        
        this.map[this.y][this.x + 1].visibility = visibility
        this.map[this.y][this.x - 1].visibility = visibility
        this.map[this.y + 1][this.x].visibility = visibility
        this.map[this.y - 1][this.x].visibility = visibility

        this.map[this.y + 1][this.x + 1].visibility = visibility
        this.map[this.y + 1][this.x - 1].visibility = visibility
        this.map[this.y - 1][this.x + 1].visibility = visibility
        this.map[this.y - 1][this.x - 1].visibility = visibility
    }

    public drawFog(context: CanvasRenderingContext2D): void {
        if (this.seen) {
            // Translucid fog
            this.drawRect(context, false, "rgba(0,0,0, 0.7)")
        }
        else {
            // Fog
            this.drawRect(context, false, "rgb(17, 17, 17)")
        }
    }

    public onClick(cursor: Cursor) {
        if (this.owner) {
            if (cursor.canGoOnWater) {
                cursor.saveSelectedUnitsInShip(this.owner)
            }
            cursor.blockSelected = this
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this.visibility == Visibility.hidden) {
            // If this tile has been seen draw a block 
            if (this.seen) {
                this.drawTile(context, this.typeSeen)
                if (SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[this.typeSeen + "_L2"]) {
                    this.drawTile(context, this.typeSeen + "_L2")
                }
            }
            // Draw fog, if it's a block that has been seenm, the fog will be translucid
            this.drawFog(context)
        }

        else {
            // Draw the sprite of this block type
            this.drawTile(context, this.type)

            // If the block has a owner draw a rect with the owner color
            if (this.owner) {
                this.drawRect(context, false)
            }

            if (SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[this.type + "_L2"]) {
                this.drawTile(context, this.type + "_L2")
            }

            if (this.ship) {
                this.drawTile(context, "BOAT_LEFT_L2")
            }

            if ((this.canBeConquer) && (this.population !== 0)) {
                this.drawText(context, String(this.population))
            }

            // Draw tile border
            this.drawRect(context, true)
            
        }
    }
}

export default Block
