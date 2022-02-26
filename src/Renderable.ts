import {
    SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP,
    BLOCK_LINE_WIDTH,
    TILE_SIZE,
    TILEMAP,
    BLOCK_DEFAULT_SIZE,
    getTextureAtlasPosition
} from "./constants"
import Vector from "./Vector"

class Renderable {
    public positionRelativeToCamera: Vector
    public tilemap: HTMLImageElement
    private _size: Vector
    public color: string = ""
    public static scale: number = 1
    public static context: CanvasRenderingContext2D

    constructor(positionRelativeToCamera: Vector, size: Vector) {
        this.positionRelativeToCamera = positionRelativeToCamera
        this._size = size
        this.tilemap = TILEMAP
    }

    public get size(): Vector {
        return this._size
    }

    public static clearWindow(): void {
        Renderable.context.beginPath()
        Renderable.context.fillStyle = "#000"
        Renderable.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }

    public drawTile(type: string): void {
        Renderable.context.beginPath()
        Renderable.context.drawImage(
            this.tilemap,
            getTextureAtlasPosition(type).x * TILE_SIZE,
            getTextureAtlasPosition(type).y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE,
            ~~(Renderable.scale * this.positionRelativeToCamera.x),
            ~~(Renderable.scale * this.positionRelativeToCamera.y),
            ~~(Renderable.scale * this._size.x - 2 * Renderable.scale),
            ~~(Renderable.scale * this._size.y - 2 * Renderable.scale)
        )
    }

    public drawText(text: string) {
        Renderable.context.beginPath()
        Renderable.context.fillStyle = "#FFFFFF"
        Renderable.context.strokeStyle = "#000"
        Renderable.context.lineWidth = Renderable.scale * 7
        Renderable.context.font = 20 * Renderable.scale + "px 'Press Start 2P'"
        Renderable.context.strokeText(
            String(text),
            Renderable.scale * (this.positionRelativeToCamera.x + this._size.x / 2 - BLOCK_DEFAULT_SIZE * 0.3),
            Renderable.scale * (this.positionRelativeToCamera.y + this._size.y / 2 - BLOCK_DEFAULT_SIZE * 0.2)
        )
        Renderable.context.font = 20 * Renderable.scale + "px 'Press Start 2P'"
        Renderable.context.fillText(
            String(text),
            Renderable.scale * (this.positionRelativeToCamera.x + this._size.x / 2 - BLOCK_DEFAULT_SIZE * 0.3),
            Renderable.scale * (this.positionRelativeToCamera.y + this._size.y / 2 - BLOCK_DEFAULT_SIZE * 0.2)
        )
    }

    public drawRect(stroke: boolean, fillColor: string | null = null) {

        if (fillColor == null) {
            fillColor = this.color
        }

        Renderable.context.beginPath()
        if (stroke) {
            Renderable.context.strokeStyle = "rgba(255, 255, 255, 0.2)"
            Renderable.context.lineWidth = BLOCK_LINE_WIDTH
        } else {
            Renderable.context.fillStyle = fillColor
        }

        Renderable.context.rect(
            ~~(Renderable.scale * this.positionRelativeToCamera.x),
            ~~(Renderable.scale * this.positionRelativeToCamera.y),
            ~~(Renderable.scale * this._size.x - 2 * Renderable.scale),
            ~~(Renderable.scale * this._size.y - 2 * Renderable.scale)
        )

        if (stroke) {
            // context.stroke()
        } else {
            Renderable.context.fill()
        }
    }
}

export default Renderable
