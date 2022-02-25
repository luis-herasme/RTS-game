import Cursor from "./Cursor"
import FPS from "./FPSManager"
import Player from "./Player"
import Scene from "./Scene"

interface playerDisplayData {
    name: string;
    population: number;
    color: string;
    territories: number;
}

class UI {
    private population: HTMLElement
    private levelUpButton: HTMLElement
    private updateRate: number
    private playersLeaderBoard: HTMLElement
    private fps: HTMLElement

    constructor(updateRate: number = 1000) {
        this.population = document.getElementById("population")
        this.levelUpButton = document.getElementById("levelUp")        
        this.playersLeaderBoard = document.getElementById("playersLeaderBoard")
        this.population.innerText = "Population: 0"
        this.updateRate = updateRate
        this.fps = document.getElementById("FPS")
    }

    public start(scene: Scene, cursor: Cursor) {
        this.startLevelUpOnClickEvent(cursor)
        setInterval(() => {
            this.updateFPS()
        }, 50)
        setInterval(() => {
            this.updatePopulationText(scene)
            this.updateLevelUpButtonVisibility(cursor)
            this.updateLeaderBoard(scene)
        }, this.updateRate)
    }

    public updateFPS(): void {
        this.fps.innerText = "FPS: " + (1000/FPS.frameTime).toFixed(1)
    }

    public updateLeaderBoard(scene: Scene) {
        // const players: Array<playerDisplayData> = []

        // scene.players.forEach((player: Player)=> {
        //     const playerData: playerDisplayData = {
        //         name: player.name,
        //         // color: this.RGBAToRGB(player.color),
        //         color: player.color,
        //         territories: 0,// player.blocks.length,
        //         population: 0
        //     }
        //     players.push(playerData)
        // })

        // scene.eachBlock((block) => {
        //     for (let player of players) {
        //         if (block.owner.name == player.name) {
        //             player.population += block.population
        //         }
        //     }
        // })

        // let leaderBoard = ""

        // const playersList = Object.values(players)
        // playersList.sort((p1, p2) => {
        //     return p2.population - p1.population
        // })

        // for (let player of playersList) {
        //     leaderBoard += `
        //         <p style="color: ${player.color}; text-decoration: ${player.population? "none": "line-through"};">${player.name}: ${player.population} POP,  ${player.territories} Territories</p>
        //     `
        // }

        // this.playersLeaderBoard.innerHTML = leaderBoard
    }

    // Start updating population text
    public updatePopulationText(scene: Scene) {
        let totalPopulation = 0
        scene.eachBlock((block) => {
            if (block.owner.name == "Luis") {
                totalPopulation += block.population
            }
        })
        this.population.innerText = `Population: ${totalPopulation}`
    }

    public RGBAToRGB(rgba: string): string {
        let removeParentesis = rgba.split("(")[1]
        removeParentesis = removeParentesis.split(")")[0]
        const colors = removeParentesis.split(",")
        return "rgb(" + colors[0] + "," + colors[1] + "," + colors[2] + ")"
    }

    public startLevelUpOnClickEvent(cursor: Cursor) {
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
        if (cursor.blockSelected) {
            if (cursor.blockSelected.level !== undefined) {
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
