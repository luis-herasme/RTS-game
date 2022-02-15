import {
    SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP,
    BLOCK_LINE_WIDTH,
    TILE_SIZE,
    TILEMAP
} from "./constants"
import Vector from "./Vector"

class Renderable {
    public positionRelativeToCamera: Vector
    public tilemap: HTMLImageElement
    private _size: Vector
    public color: string = ""
    
    constructor(positionRelativeToCamera: Vector, size: Vector) {
        this.positionRelativeToCamera = positionRelativeToCamera
        this._size = size
        this.tilemap = TILEMAP
    }

    public get size(): Vector {
        return this._size
    }
    
    public drawTile(context: CanvasRenderingContext2D, type: string): void {
        context.beginPath()
        context.drawImage(
            this.tilemap,
            SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[type].x * TILE_SIZE,
            SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP[type].y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE,
            this.positionRelativeToCamera.x,
            this.positionRelativeToCamera.y,
            this._size.x,
            this._size.y
        )
    }

    public drawText(context: CanvasRenderingContext2D, text: string) {
        context.beginPath()
        context.fillStyle = "#FFFFFF"
        context.strokeStyle = "#333"
        context.lineWidth = 7
        context.font = "20px 'Press Start 2P'"
        context.strokeText(
            String(text),
            this.positionRelativeToCamera.x + this._size.x / 2 - 30,
            this.positionRelativeToCamera.y + this._size.y / 2 - 20
        )
        context.font = "20px 'Press Start 2P'"
        context.fillText(
            String(text),
            this.positionRelativeToCamera.x + this._size.x / 2 - 30,
            this.positionRelativeToCamera.y + this._size.y / 2 - 20
        )
    }

    public drawRect(context: CanvasRenderingContext2D, stroke: boolean, fillColor: string = null) {

        if (fillColor == null) {
            fillColor = this.color
        }

        context.beginPath()
        if (stroke) {
            context.strokeStyle = "rgba(255, 255, 255, 0.2)"
            context.lineWidth = BLOCK_LINE_WIDTH
        } else {
            context.fillStyle = fillColor
        }

        context.rect(
            this.positionRelativeToCamera.x,
            this.positionRelativeToCamera.y,
            this._size.x,
            this._size.y 
        )

        if (stroke) {
            context.stroke()
        } else {
            context.fill()
        }
    }
}

export default Renderable
