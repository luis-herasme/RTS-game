import Block from "./Block"
import Cursor from "./Cursor"
import FPS from "./FPSManager"
import Player from "./Player"
import Scene from "./Scene"
import Settlement from "./Settlement"
import StateManager from "./StateManager/SM/StateManager"
import { BlockPosition, PlayerDisplayData } from "./StateManager/stateManagementTypes"

class UI {
    private population: HTMLElement | null
    private levelUpButton: HTMLElement | null
    private updateRate: number
    private playersLeaderBoard: HTMLElement | null
    private fps: HTMLElement | null
    private stateManager: StateManager
    private playerName: string

    constructor(stateManager: StateManager, playerName: string, updateRate: number = 500) {
        this.population = document.getElementById("population")
        this.levelUpButton = document.getElementById("levelUp")        
        this.playersLeaderBoard = document.getElementById("playersLeaderBoard")
        this.fps = document.getElementById("FPS")
        this.updateRate = updateRate
        this.stateManager = stateManager
        this.playerName = playerName
    }

    public start(scene: Scene, cursor: Cursor) {
        this.startLevelUpOnClickEvent()
        setInterval(() => {
            this.updateFPS()
        }, 50)
        setInterval(() => {
            // this.updatePopulationText(scene)
            this.updateLevelUpButtonVisibility(cursor)
            this.updateLeaderBoardAndPopulation()
        }, this.updateRate)
    }

    public updateFPS(): void {
        if (this.fps !== null) {
            this.fps.innerText = "FPS: " + (1000/FPS.frameTime).toFixed(1)
        } else {
            throw Error("FPS DOM element not defined.")
        }
    }

    public updateLeaderBoardAndPopulation() {
        const playersDisplayData: Array<PlayerDisplayData> = this.stateManager.getLeaderBoard()
        let leaderBoard = ""
        playersDisplayData.sort((p1: PlayerDisplayData, p2: PlayerDisplayData) => {
            return p2.population - p1.population
        })

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
                const block: BlockPosition | null = this.stateManager.getBlockSeletec(this.playerName)
                console.log("HICISTE CLICK EN LEVEL UP, block: ", block)
                if (block !== null) {
                    console.log("Leveling up from ui")
                    this.stateManager.levelUpBlock(block)
                }
            }
        } else {
            console.warn("Level up button element html is not defined.")
        }
        // this.levelUpButton.onclick = () => {
        //     if (cursor.blockSelected) {
        //         if ((cursor.blockSelected.level !== undefined) && (cursor.blockSelected.owner)) {
        //             if (cursor.blockSelected.level == 3) {
        //                 console.log("You are in the max level")
        //             } else {
        //                 if (cursor.blockSelected.population > 10 * cursor.blockSelected.level + 10) {
        //                     cursor.blockSelected.population = cursor.blockSelected.population - (10 * cursor.blockSelected.level + 10)
        //                     cursor.blockSelected.level = cursor.blockSelected.level + 1
        //                 } else {
        //                     console.log("You need more than: ", 10 * cursor.blockSelected.level + 10, " units in this block.")
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    public updateLevelUpButtonVisibility(cursor: Cursor) {
        if (this.levelUpButton == null) {
            throw Error("LevelUpButton DOM element not defined.")
        }
        if (cursor.blockSelected) {
            if (Settlement.isSettlement(cursor.blockSelected)) {
                if (
                    (cursor.blockSelected.owner) &&
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
