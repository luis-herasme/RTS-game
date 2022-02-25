import Renderable from "./Renderable"

class CanvasManager {
    private canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D | null

    constructor() {
        this.canvas = document.getElementsByTagName("canvas")[0]
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        document.body.appendChild(this.canvas)
        this.context = this.canvas.getContext("2d", { alpha: false })

        if (this.context === null) {
            throw Error("Canvas context 2D is not supported.")
        }

        Renderable.context = this.context // ! Refactorizar

        // To make the pixel art no look blurry
        this.context.imageSmoothingEnabled = false
        this.updateCanvasSizeOnWindowResize()
    }

    updateCanvasSizeOnWindowResize() {
        window.addEventListener("resize", () => {
            this.canvas.width = window.innerWidth
            this.canvas.height = window.innerHeight
        
            if (this.context === null) {
                throw Error("Canvas context 2D is not defined.")
            }

            // To make the pixel art no look blurry
            this.context.imageSmoothingEnabled = false
        })        
    }
}

export default CanvasManager
