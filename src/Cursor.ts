import Block from "./Block"
import { BLOCK_DEFAULT_SIZE, TILEMAP } from "./constants"
import Player from "./Player"
import Renderable from "./Renderable"
import Vector from "./Vector"

class Cursor extends Renderable {
    public canGoOnWater: boolean = false
    // public tilemap: HTMLImageElement
    public player: Player
    public blockSelected: Block | null = null

    constructor(player: Player) {
        super(new Vector(0, 0), new Vector(BLOCK_DEFAULT_SIZE, BLOCK_DEFAULT_SIZE))
        this.tilemap = TILEMAP
        this.player = player
    }

    // public get blockSelected(): Block | null {
    //     return this._blockSelected
    // }

    // public set blockSelected(value: Block | null ) {
    //     this._blockSelected = value

    //     if (this._blockSelected !== null) {

    //         if (this._blockSelected.type == "SHIP" || this._blockSelected.ship == true) {
    //             this.canGoOnWater = true
    //             this.blockSelected.ship = true
    //         }

    //         if (this._blockSelected.type[0] != "W" && this._blockSelected.type != "SHIP") {
    //             this.canGoOnWater = false
    //             this._blockSelected.ship = false
    //         }
    //     }
    // }

    // Renders a shadow above the selected block
    public render() {
        if (this.blockSelected !== null) {
            this.positionRelativeToCamera = this.blockSelected.positionRelativeToCamera
            this.drawTile("SHADOW")
        }
    }
}

export default Cursor
