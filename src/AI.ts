import Player from "./Player"
import StateManager from "./StateManager/StateManager"
import { BlockPosition } from "./StateManager/stateManagementTypes"

class AI extends Player {
    private stateManager: StateManager
    private blockSelectedData: BlockPosition

    constructor(name: string, color: string, capital: BlockPosition, stateManager: StateManager) {
        super(name, color, capital)
        this.blockSelectedData = capital
        this.stateManager = stateManager
    }

    public start() {
        this.stateManager.setBlockSelectedFromClick(this.name, this.capital)
        const playerData = this.stateManager.getPlayerData(this.name)
        if (playerData.blockSelected !== null) {
            this.blockSelectedData = playerData.blockSelected.position
        }

        setInterval(() => {
            // this.checkIfAlive() //! CAMBIAR ESTO
            if (this.alive) {
                // if (this.cursor.blockSelected.owner.name !== this.name) {
                    // this.stateManager.setBlockSelectedFromClick(this.name, this.capital)
                    // this.cursor.blockSelected = this.capital
                // }
                this.move()
            }
        }, 100)
    }

    private getNextStep() {
        let x = 0, y = 0

        if (Math.random() > 0.5) {
            if (Math.random() > 0.5) {
                x = 1
            } else {
                x = - 1
            }
        } else {
            if (Math.random() > 0.5) {
                y = 1
            } else {
                y = - 1
            }
        }

        return { x, y }
    }

    private move() {
        let { x, y } = this.getNextStep()
        x += this.blockSelectedData.x
        y += this.blockSelectedData.y
        if (this.stateManager.move({x, y}, this.blockSelectedData, this.name, false)) {
            this.blockSelectedData = {x, y}
        }
        // this.moveHelper({}, this.cursor.blockSelected, false)
    }
}

export default AI
