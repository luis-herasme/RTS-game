import StateChecks from "./ChecksSM"
import { BlockData, PlayerData, Visibility } from "./stateManagementTypes"

class StateVisibility extends StateChecks {

    protected setBlockVisibility(value: Visibility, block: BlockData, player: PlayerData): void {
        const previousState: Visibility = block.visibility[player.name]

        block.visibility[player.name] = value

        if (this.isNextToPlayer(block, player.name)) {
            block.visibility[player.name] = Visibility.visible
        }

        if (previousState != block.visibility[player.name]) {
            block.dirty = true
        }
    }

    protected setSurroundingsVisibility(block: BlockData, visibility: Visibility, player: PlayerData): void {
        this.setBlockVisibility(visibility, this.state.map[block.position.y][block.position.x], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y][block.position.x + 1], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y][block.position.x - 1], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y + 1][block.position.x], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y - 1][block.position.x], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y + 1][block.position.x + 1], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y + 1][block.position.x - 1], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y - 1][block.position.x + 1], player)
        this.setBlockVisibility(visibility, this.state.map[block.position.y - 1][block.position.x - 1], player)
    }
}

export default StateVisibility
