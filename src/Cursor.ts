import Block from "./Block"
import { 
    BLOCK_DEFAULT_SIZE,
    TILEMAP,
    Visibility
 } from "./constants"
import Player from "./Player"
import Renderable from "./Renderable"
import Settlement from "./Settlement"
import Vector from "./Vector"

class Cursor extends Renderable {
    public canGoOnWater: boolean = false
    public tilemap: HTMLImageElement
    public player: Player

    private _blockSelected: Block | null | Settlement = null
    private context: CanvasRenderingContext2D
    public map: Array<Array<Block | Settlement>>

    constructor(
        context: CanvasRenderingContext2D,
        map: Array<Array<Block | Settlement>>,
        player: Player
    ) {
        super(new Vector(0, 0), new Vector(BLOCK_DEFAULT_SIZE, BLOCK_DEFAULT_SIZE))
        this.context = context
        this.tilemap = TILEMAP
        this.map = map
        this.player = player
        this.startListeningToKeyboardEvents()
    }

    public get blockSelected(): Block | null {
        return this._blockSelected
    }

    public set blockSelected(value: Block | null | Settlement) {    

        // Hiding previous block surroundings if it was a boat
        if (this._blockSelected !== null) {
            if (this._blockSelected.type[0] == "W") {
                if (this.canGoOnWater) {
                    this._blockSelected.setVisibility(Visibility.hidden)    
                }
            }
        }

        this._blockSelected = value

        if (this._blockSelected !== null) {
            if (this._blockSelected.border == false) {
                if (this._blockSelected.owner == this.player) {
                    this._blockSelected.setVisibility(Visibility.visible)
                }
    
                if ((this._blockSelected.owner == this.player) && (this._blockSelected.type == "SHIP" || this._blockSelected.type == "BOAT_LEFT")) {
                    this.canGoOnWater = true
                }
    
                else if (this._blockSelected.type[0] != "W") {
                    this.canGoOnWater = false
                }

                if (this.canGoOnWater) {
                    this._blockSelected.setVisibility(Visibility.visible)
                }

            }
        }

    }

    public saveSelectedUnitsInShip(player: Player) {
        if (this.blockSelected !== null) {
            this.blockSelected.ship = true
            this.blockSelected.canBeConquer = true
            player.conquerBlock(this.blockSelected)
            this.canGoOnWater = false
            this._blockSelected.setVisibility(Visibility.visible)
        }
    }

    private move(newBlock: Block, prevBlock: Block) {
    
        // If you are not the owner of the new block
        if (newBlock.owner !== this.player) {
            // If your poplation is greater you can conquer
            if (prevBlock.population - 1 > newBlock.population) {
                newBlock.population = prevBlock.population - 1 - newBlock.population
                this.player.conquerBlock(newBlock)
                this.blockSelected = newBlock
            } 
            // If your population is leasser you can attack
            else {
                newBlock.population = newBlock.population - (prevBlock.population - 1)
                this.blockSelected = newBlock
            }
        }
        // If that block is yours, you move your population
        else {
            newBlock.population = prevBlock.population - 1 + newBlock.population
            this.blockSelected = newBlock
        }

        if (prevBlock.ship) {
            prevBlock.population = 0 
            newBlock.population = newBlock.population + 1
            newBlock.setVisibility(Visibility.visible)
        } 
        else {
            prevBlock.population = 1
        }    
    }
    
    private startListeningToKeyboardEvents() {
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLocaleLowerCase()
        
            if (this.blockSelected !== null) {
                const blockSelected = this.blockSelected
                const x = blockSelected.x
                const y = blockSelected.y 

                
                if (key === 'arrowup') {
                    if (this.map[y - 1][x].border) return 0
                }
                else if (key === 'arrowdown') {
                    if (this.map[y + 1][x].border) return 0
                }
                else if (key === 'arrowright') {
                    if (this.map[y][x + 1].border) return 0
                }
                else if (key === 'arrowleft') {
                    if (this.map[y][x - 1].border) return 0
                }


                if ((blockSelected.population > 1 && blockSelected.owner == this.player) || this.canGoOnWater) {
                    if (key === 'arrowup') {
                        if (this.map[y - 1][x].canBeConquer || (this.map[y - 1][x].type[0] == "W" || this.map[y - 1][x].type == "BOAT_LEFT") && (this.canGoOnWater) ) {
                            const newBlock = this.map[y - 1][x]
                            this.move(newBlock, blockSelected)
                        }
                    }
                    else if (key === 'arrowdown') {
                        if (this.map[y + 1][x].canBeConquer || (this.map[y + 1][x].type[0] == "W" || this.map[y + 1][x].type == "BOAT_LEFT") && (this.canGoOnWater) ) {
                            const newBlock = this.map[y + 1][x]
                            this.move(newBlock, blockSelected)
                        }
                    }
                    else if (key === 'arrowright') {
                        if (this.map[y][x + 1].canBeConquer || (this.map[y][x + 1].type[0] == "W" || this.map[y][x + 1].type == "BOAT_LEFT") && (this.canGoOnWater) ) {
                            const newBlock = this.map[y][x + 1]
                            this.move(newBlock, blockSelected)
                        }
                    }
                    else if (key === 'arrowleft') {
                        if (this.map[y][x - 1].canBeConquer || (this.map[y][x - 1].type[0] == "W" || this.map[y][x - 1].type == "BOAT_LEFT") && (this.canGoOnWater) ) {
                            const newBlock = this.map[y][x - 1]
                            this.move(newBlock, blockSelected)
                        }
                    }
                } 
                else {
                    if (key === 'arrowup') {
                        this.blockSelected = this.map[y - 1][x]
                    }
                    else if (key === 'arrowdown') {
                        this.blockSelected = this.map[y + 1][x]
                    }
                    else if (key === 'arrowright') {
                        this.blockSelected = this.map[y][x + 1]
                    }
                    else if (key === 'arrowleft') {
                        this.blockSelected = this.map[y][x - 1]
                    }
                }
            }
        })
    }

    public update() {
        if (this.blockSelected !== null) {
            if (this.canGoOnWater && (this.blockSelected.population == 0)) {
                this.blockSelected.setVisibility(Visibility.hidden)
                this.canGoOnWater = false
                // this.blockSelected = null
            }
        }
        this.renderSelectedBlock()
    }

    public renderSelectedBlock() {
        
        if (this.blockSelected !== null) {
            this.positionRelativeToCamera = this.blockSelected.positionRelativeToCamera
            this.drawTile(this.context, "SHADOW")

            if (this.canGoOnWater) {                
                this.drawTile(this.context, "BOAT_LEFT_L2")
                this.drawText(this.context, String(this.blockSelected.population))
            }
        }
    }
}

export default Cursor
