import Camera from "./Camera"
import CanvasManager from "./CanvasManager"
import Cursor from "./Cursor"
import Player from "./Player"
import Scene from "./Scene"
import Vector from "./Vector"

class GameManager {
    private scene: Scene
    private camera: Camera
    private cursor: Cursor
    private player: Player
    private canvasManager: CanvasManager

    constructor(map: Array<Array<string>>, player: Player) {
        // Creates canvas
        this.canvasManager = new CanvasManager()
        this.scene = new Scene(this.canvasManager.context, map)
        this.player = player
        this.camera = new Camera(this.scene.map)
        this.cursor = new Cursor(this.canvasManager.context, this.scene.map, this.player)

        // Initial player position
        this.scene.map[3][4].population = 1
        this.player.conquerBlock(this.scene.map[3][4])

        // Events
        this.startListeningToOnBlockClick()
    }

    public start(): void {

        window.onload = () => {    
            const population = document.getElementById("population")
            const levelUp = document.getElementById("levelUp")
            population.innerText = "Population: 0"
        
        
            setInterval(() => {
                if (this.cursor.blockSelected) {
                    if (this.cursor.blockSelected.level !== undefined) {
                        if (
                            (this.cursor.blockSelected.owner) && 
                            (this.cursor.blockSelected.level < 3) && 
                            (this.cursor.blockSelected.population > 10 * this.cursor.blockSelected.level + 10)
                        ) 
                        {
                            levelUp.style.visibility = "visible"
                        }
                        else {
                            levelUp.style.visibility = "hidden"
                        }
                    }
                    else {
                        levelUp.style.visibility = "hidden"
                    }
                } 
                else {
                    levelUp.style.visibility = "hidden"
                }
            }, 100)
            
        
            levelUp.onclick = () => {
                if (this.cursor.blockSelected) {
                    if (this.cursor.blockSelected.level !== undefined) {
                        if (this.cursor.blockSelected.owner) {
                            if (this.cursor.blockSelected.level == 3) {
                                console.log("You are in the max level")
                            } else {
                                if (this.cursor.blockSelected.population > 10 * this.cursor.blockSelected.level + 10) {
                                    this.cursor.blockSelected.population = this.cursor.blockSelected.population - (10 * this.cursor.blockSelected.level + 10)
                                    this.cursor.blockSelected.level = this.cursor.blockSelected.level + 1 
                                } else {
                                    console.log("You need more than: ", 10 * this.cursor.blockSelected.level + 10, " units in this block.")
                                }
                            }
                        }
                    }
                }
            }
        
            // Increase population by one each 3 seconds 
            setInterval(() => {
                let totalPopulation = 0
                this.scene.eachBlock((block) => {
                    if (block.ship) {
                        block.population = block.population - 1
                    }
                    else if ((block._owner !== undefined) && (block.level != undefined)) {
                        block.population = block.population + (block.level + 1)
                        totalPopulation += block.population
                    } 
                })
                population.innerText = `Population: ${totalPopulation}`
            }, 1000)
        
            setInterval(() => {
                this.scene.eachBlock((block) => {
                    if (block._owner !== undefined) {
                        block.population = block.population + 1
                    } 
                    if (block.ship) {
                        block.population = block.population - 1
                    }
                })
            }, 100)
        }


        requestAnimationFrame(() => this.update())
        
    }

    // Events
    public startListeningToOnBlockClick(): void {
        document.addEventListener("click", (e: MouseEvent) => {
            const mousePosition = new Vector(e.clientX, e.clientY)
            this.scene.map.forEach(x => {
                x.forEach(block => {
                    if (
                        (mousePosition.x > block.positionRelativeToCamera.x && mousePosition.x < block.positionRelativeToCamera.x + block.size.x)
                        &&
                        (mousePosition.y > block.positionRelativeToCamera.y && mousePosition.y < block.positionRelativeToCamera.y + block.size.y)
                    ) {
                        block.onClick(this.cursor)
                    }
                })
            })
        })
    }

    public update() {
        this.scene.update()
        this.cursor.update()
        this.camera.update()
        requestAnimationFrame(() => this.update())
    }
}

export default GameManager
