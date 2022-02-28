import { NONE_PLAYER } from "./constants"
import Cursor from "./Cursor"
import FPS from "./FPSManager"
import Settlement from "./Settlement"
import ClientStateManager from "./StateManager/ClientStateManager"
import { PlayerDisplayData } from "./StateManager/stateManagementTypes"

class UI {
    private population: HTMLElement | null
    private levelUpButton: HTMLElement | null
    private updateRate: number
    private playersLeaderBoard: HTMLElement | null
    private fps: HTMLElement | null
    private clientStateManager: ClientStateManager
    private playerName: string

    constructor(clientStateManager: ClientStateManager, playerName: string, updateRate: number = 500) {
        this.population = document.getElementById("population")
        this.levelUpButton = document.getElementById("levelUp")        
        this.playersLeaderBoard = document.getElementById("playersLeaderBoard")
        this.fps = document.getElementById("FPS")
        this.updateRate = updateRate
        this.clientStateManager = clientStateManager
        this.playerName = playerName
    }

    public start(cursor: Cursor) {
        this.startLevelUpOnClickEvent()
        setInterval(() => {
            this.updateFPS()
        }, 50)
        setInterval(() => {
            this.updateLevelUpButtonVisibility(cursor)
            this.updateLeaderBoardAndPopulation()
        }, this.updateRate)
    }

    private updateFPS(): void {
        if (this.fps !== null) {
            this.fps.innerText = "FPS: " + (1000/FPS.frameTime).toFixed(1)
        } else {
            throw Error("FPS DOM element not defined.")
        }
    }

    private updateLeaderBoardAndPopulation() {
        const playersDisplayData: Array<PlayerDisplayData> = this.clientStateManager.getLeaderBoard()
        let leaderBoard = ""
        playersDisplayData.sort((p1: PlayerDisplayData, p2: PlayerDisplayData) => p2.population - p1.population)

        for (let player of playersDisplayData) {
            
            leaderBoard += `
                <p style="color: ${player.color}; text-decoration: ${player.population? "none": "line-through"};">${player.name}: ${player.population} POP,  ${player.territories} Territories</p>
            `
            
            if (player.name == this.playerName) {
                this.setPopulation(player.population)
            }
        }
        if (this.playersLeaderBoard !== null) {
            this.playersLeaderBoard.innerHTML = leaderBoard
        } else {
            throw Error("PlayersLeaderBoard HTML Element is not defined.")
        }
    }

    // Start updating population text
    public setPopulation(population: number) {
        if (this.population == null) {
            throw Error("population DOM element not defined.")
        }
        this.population.innerText = `Population: ${population}`
    }

    public RGBAToRGB(rgba: string): string {
        let removeParentesis = rgba.split("(")[1]
        removeParentesis = removeParentesis.split(")")[0]
        const colors = removeParentesis.split(",")
        return "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")"
    }

    public startLevelUpOnClickEvent() {
        if (this.levelUpButton !== null) {
            this.levelUpButton.onclick = () => {
                this.clientStateManager.levelUpBlockSelected(this.playerName)
            }
        } else {
            console.warn("Level up button element html is not defined.")
        }
    }

    public updateLevelUpButtonVisibility(cursor: Cursor) {
        if (this.levelUpButton == null) {
            throw Error("LevelUpButton DOM element not defined.")
        }
        if (cursor.blockSelected) {
            if (Settlement.isSettlement(cursor.blockSelected)) {
                if (
                    (cursor.blockSelected.ownerName !== NONE_PLAYER.name) &&
                    (cursor.blockSelected.level < 3) &&
                    (cursor.blockSelected.population > 10 * cursor.blockSelected.level + 10)
                ) {
                    this.levelUpButton.style.visibility = "visible"
                }
                else {
                    this.levelUpButton.style.visibility = "hidden"
                }
            }
            else {
                this.levelUpButton.style.visibility = "hidden"
            }
        }
        else {
            this.levelUpButton.style.visibility = "hidden"
        }
    }
}

export default UI
