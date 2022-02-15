import Block from "./Block"
import Vector from "./Vector"
import { BLOCK_DEFAULT_SIZE } from "./constants"
import Settlement from "./Settlement"

function generateMapMatrix(mapSize: number) {
    const map = []
    for (let y = 0; y < mapSize; y++) {
        map[y] = []
        for (let x = 0; x < mapSize; x++) {
            map[y][x] = null
        }
    }
    return map
}

class Scene {
    public map: Array<Array<Block | Settlement>>
    private context: CanvasRenderingContext2D
    
    constructor(context: CanvasRenderingContext2D, map: Array<Array<string>>) {
        this.context = context
        this.loadMap(map)
    }

    public add(block: Block, x: number, y: number): void {
        block.map = this.map
        this.map[y][x] = block
    }

    public update(): void {
        this.render()
    }

    public eachBlock(fn: Function) {
        this.map.forEach(mapRow => {
            mapRow.forEach(block => {
                fn(block)
            })
        })
    }

    loadMap(map: Array<Array<string>>) {
        
        this.map = generateMapMatrix(map.length)

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map.length; x++) {
                const size = new Vector(BLOCK_DEFAULT_SIZE + 1, BLOCK_DEFAULT_SIZE + 1)
                const position = new Vector(x * BLOCK_DEFAULT_SIZE, y * BLOCK_DEFAULT_SIZE)
                const block = new Block(position, size, x, y, map[y][x])
                
                if (x == 0 || x == (map.length - 1) || y == 0 || y == (map.length - 1)) {
                    block.border = true
                }


                if (map[y][x].includes("TOWER_LEVEL_") || map[y][x] == "H") {
                    const settlement = new Settlement(position, size, x, y, map[y][x])

                    if (x == 0 || x == (map.length - 1) || y == 0 || y == (map.length - 1)) {
                        settlement.border = true
                    }

                    if (map[y][x] === "H") {
                        settlement.population = 5
                        settlement.level = 0
                    }
                    else if (map[y][x] === "TOWER_LEVEL_1") {
                        settlement.population = 10
                        settlement.level = 1
                    }
    
                    else if (map[y][x] === "TOWER_LEVEL_3") {
                        settlement.population = 100
                        settlement.level = 3
                    }
                    this.add(settlement, x, y)
                }
                else {
                    if (map[y][x][0] == "W") {
                        block.canBeConquer = false
                    }
                    
                    if (map[y][x] == "SHIP") {
                        block.population = 2
                        block.canBeConquer = true
                    }
                    else if (map[y][x] === "MOUNTAIN") {
                        block.canBeConquer = false
                    }
                    this.add(block, x, y)
                }
            }
        }
    }


    // Renderization
    public render(): void {
        this.clear()
        this.map.forEach(x => {
            x.forEach(block => {
                block.render(this.context)
            })
        })
    }

    private clear(): void {
        this.context.beginPath()
        this.context.fillStyle = "#000000"
        this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }
}

export default Scene
