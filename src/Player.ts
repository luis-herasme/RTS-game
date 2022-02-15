import Block from "./Block"

class Player {
    public color: string
    public name: string
    private blocks: Array<Block>

    constructor(name: string, color: string) {
        this.name = name
        this.color = color
        this.blocks = []
    }    

    removeBlock(block: Block) {
        const idx = this.blocks.indexOf(block)
        if (idx > -1) {
            this.blocks.splice(idx, 1)
        }
        else {
            console.error("Block not found")
        }
    }

    conquerBlock(block: Block) {
        if (block.canBeConquer) {
            block.owner = this
            
            this.blocks.push(block)
        }
    }
}

export default Player