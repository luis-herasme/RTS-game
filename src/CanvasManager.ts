import Renderable from "./Renderable"

class CanvasManager {
    private _canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D

    constructor() {
        this._canvas = document.getElementsByTagName("canvas")[0]
        this._canvas.width = window.innerWidth
        this._canvas.height = window.innerHeight
        document.body.appendChild(this._canvas)
        this.context = this._canvas.getContext("2d", { alpha: false })
        
        Renderable.context = this.context // ! Refactorizar

        // To make the pixel art no look blurry
        this.context.imageSmoothingEnabled = false
        this.updateCanvasSizeOnWindowResize()
    }

    updateCanvasSizeOnWindowResize() {
        window.addEventListener("resize", () => {
            this._canvas.width = window.innerWidth
            this._canvas.height = window.innerHeight
        
            // To make the pixel art no look blurry
            this.context.imageSmoothingEnabled = false
        })        
    }
}

export default CanvasManager
