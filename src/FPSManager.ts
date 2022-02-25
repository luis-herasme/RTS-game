class FPS {
    private filterStrength = 10
    private lastLoopTime = new Date()
    public static frameTime = 0

    public update() {
        const thisLoopTime = new Date()
        const deltaTime = Number(thisLoopTime) - Number(this.lastLoopTime)
        FPS.frameTime += (deltaTime - FPS.frameTime) / this.filterStrength
        this.lastLoopTime = thisLoopTime
    }
}

export default FPS
