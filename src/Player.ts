import Block from "./Block"
import Cursor from "./Cursor"
import { BlockPosition } from "./StateManager/stateManagementTypes"

class Player {
    public color: string
    public name: string
    public alive: boolean = true
    public cursor: Cursor
    public capital: BlockPosition

    constructor(name: string, color: string, capital: BlockPosition) {
        this.name = name
        this.color = color
        this.capital = capital

        this.cursor = new Cursor(this)
    }

    // public removeBlock(block: Block): void {
    //     if (this.name != "NONE") {
    //         this.blocks = this.blocks.filter(x => x !== block)
    //     }
    // }

    // public conquerBlock(block: Block): void {
    //     if (block.type[0] !== "W") {
    //         this.blocks.push(block)
    //     }
    //     block.owner = this
    // }

    // public checkIfAlive(): void {
    //     if (this.capital.owner.name != this.name) {
    //         if (this.alive) {
    //             alert(`${this.capital.owner.name} KILLED ${this.name}`)
    //             this.transferAllBlocksTo(this.capital.owner)
    //         }
    //         this.alive = false
    //     }
    // }

    // public transferAllBlocksTo(newOwner: Player) {
    //     this.blocks.forEach((block: Block) => {
    //         newOwner.conquerBlock(block)
    //     })
    // }
}

export default Player