import Block from "./Block"
import { BLOCK_DEFAULT_SIZE, TILEMAP } from "./constants"
import Player from "./Player"
import Renderable from "./Renderable"
import Vector from "./Vector"

class Cursor extends Renderable {
    public player: Player
    public canGoOnWater: boolean = false
    public blockSelected: Block | null = null

    constructor(player: Player) {
        super(new Vector(0, 0), new Vector(BLOCK_DEFAULT_SIZE, BLOCK_DEFAULT_SIZE))
        this.tilemap = TILEMAP
        this.player = player
    }

    // Renders a shadow above the selected block
    public render() {
        if (this.blockSelected !== null) {
            this.positionRelativeToCamera = this.blockSelected.positionRelativeToCamera
            this.drawTile("SHADOW")
        }
    }
}

export default Cursor
