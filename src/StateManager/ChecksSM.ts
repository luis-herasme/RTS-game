import BaseStateManager from "./BaseStateManager"
import { BlockData } from "./stateManagementTypes"

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

    protected isOnBorder(block: BlockData): boolean {
        return (
            block.position.y == 0 ||
            block.position.x == 0 ||
            block.position.x == (this.state.map.length - 1) ||
            block.position.y == (this.state.map.length - 1)
        )
    }

    protected isNextToPlayer(block: BlockData, playerName: string): boolean {
        if (!this.isOnBorder(block)) {
            return (
                this.state.map[block.position.y][block.position.x].ownerName == playerName ||
                this.state.map[block.position.y][block.position.x + 1].ownerName == playerName ||
                this.state.map[block.position.y + 1][block.position.x].ownerName == playerName ||
                this.state.map[block.position.y][block.position.x - 1].ownerName == playerName ||
                this.state.map[block.position.y - 1][block.position.x].ownerName == playerName ||
                this.state.map[block.position.y + 1][block.position.x + 1].ownerName == playerName ||
                this.state.map[block.position.y - 1][block.position.x + 1].ownerName == playerName ||
                this.state.map[block.position.y + 1][block.position.x - 1].ownerName == playerName ||
                this.state.map[block.position.y - 1][block.position.x - 1].ownerName == playerName
            )
        }
        return false
    }

    protected wasNextToPlayer(block: BlockData, playerName: string): boolean {
        if (!this.isOnBorder(block)) {
            return (
                this.state.map[block.position.y][block.position.x].previousOwnerName == playerName ||
                this.state.map[block.position.y][block.position.x + 1].previousOwnerName == playerName ||
                this.state.map[block.position.y + 1][block.position.x].previousOwnerName == playerName ||
                this.state.map[block.position.y][block.position.x - 1].previousOwnerName == playerName ||
                this.state.map[block.position.y - 1][block.position.x].previousOwnerName == playerName ||
                this.state.map[block.position.y + 1][block.position.x + 1].previousOwnerName == playerName ||
                this.state.map[block.position.y - 1][block.position.x + 1].previousOwnerName == playerName ||
                this.state.map[block.position.y + 1][block.position.x - 1].previousOwnerName == playerName ||
                this.state.map[block.position.y - 1][block.position.x - 1].previousOwnerName == playerName
            )
        }
        return false
    }
}

export default StateChecks
