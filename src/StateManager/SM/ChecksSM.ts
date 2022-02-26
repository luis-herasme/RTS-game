import BaseStateManager from "./BaseStateManager"
import { BlockData } from "../stateManagementTypes"

class StateChecks extends BaseStateManager {

    protected isSettlement(block: BlockData): boolean {
        return (
            (block.type == "H") ||
            (block.type == "TOWER_LEVEL_1") ||
            (block.type == "TOWER_LEVEL_2") ||
            (block.type == "TOWER_LEVEL_3")
        )
    }

    protected isWater(block: BlockData): boolean {
        return (block.type[0] == "W")
    }

    // TODO: ALGO QUE PODRIA IR EN MAP
    protected isOnBorder(block: BlockData): boolean {
        return (
            block.position.y == 0 ||
            block.position.x == 0 ||
            block.position.x == (this.state.map.length - 1) ||
            block.position.y == (this.state.map.length - 1)
        )
    }

    // TODO: ALGO QUE PODRIA IR EN MAP
    private getBlockIfDefined(x: number, y: number): BlockData | null {
        if (this.state.map[y]) {
            if (this.state.map[y][x] !== undefined) {
                return this.state.map[y][x]
            }
        }
        return null
    }

 // TODO: ALGO QUE PODRIA IR EN MAP
    protected getSurroundingBlocks(block: BlockData): Array<BlockData | null> {
        const {x, y} = block.position
        return [
            this.getBlockIfDefined(x, y),
            this.getBlockIfDefined(x + 1, y),
            this.getBlockIfDefined(x - 1, y),
            this.getBlockIfDefined(x, y + 1),
            this.getBlockIfDefined(x, y - 1),
            this.getBlockIfDefined(x + 1, y + 1),
            this.getBlockIfDefined(x + 1, y - 1),
            this.getBlockIfDefined(x - 1, y + 1),
            this.getBlockIfDefined(x - 1, y - 1),
        ]
    }

    private getPreviousOwnerName(block: BlockData | null): string | null {
        if (block == null) {
            return null
        }
        return block.previousOwnerName
    }

    private getOwnerName(block: BlockData | null): string | null {
        if (block == null) {
            return null
        }
        return block.ownerName
    }

    protected isNextToPlayer(block: BlockData, playerName: string): boolean {
        const surrondingBlocks: Array<BlockData | null> = this.getSurroundingBlocks(block)

        for (let i = 0; i < surrondingBlocks.length; i++) {
            if (this.getOwnerName(surrondingBlocks[i]) == playerName) {
                return true
            }
        }

        return false
    }

    protected wasNextToPlayer(block: BlockData, playerName: string): boolean {
        const surrondingBlocks: Array<BlockData | null> = this.getSurroundingBlocks(block)

        for (let i = 0; i < surrondingBlocks.length; i++) {
            if (this.getPreviousOwnerName(surrondingBlocks[i]) == playerName) {
                return true
            }
        }

        return false
    }
}

export default StateChecks
