import StateChecks from "./ChecksSM"
import { BlockData, PlayerData, Visibility } from "../stateManagementTypes"

class StateVisibility extends StateChecks {

    protected setBlockVisibility(value: Visibility, block: BlockData | null, player: PlayerData): void {

        if (block == null) {
            return
        }

        const previousState: Visibility | undefined = block.visibility.get(player.name)

        block.visibility.set(player.name, value)

        if (this.isNextToPlayer(block, player.name)) {
            block.visibility.set(player.name, Visibility.visible)
        }

        if (previousState != block.visibility.get(player.name)) {
            block.dirty = true
        }
    }

    protected setSurroundingsVisibility(block: BlockData, visibility: Visibility, player: PlayerData): void {
        const surroundingBlocks: Array<BlockData | null> = this.getSurroundingBlocks(block)
        for (let i = 0; i < surroundingBlocks.length; i++) {
            this.setBlockVisibility(visibility, surroundingBlocks[i], player)    
        }
    }
}

export default StateVisibility
