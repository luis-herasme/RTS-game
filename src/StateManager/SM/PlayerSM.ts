import { NONE_PLAYER_DATA } from "../../constants"
import { BlockData, PlayerData, Visibility } from "../stateManagementTypes"
import StateVisibility from "./VisibilitySM"

class PlayersStateManager extends StateVisibility {

    protected removeBlock(block: BlockData, player: PlayerData): void {
        if (player.name != NONE_PLAYER_DATA.name) {
            player.blocks = player.blocks.filter(x => x !== block)
            block.previousOwnerName = player.name
            block.ownerName = ""
            this.setSurroundingsVisibility(block, Visibility.hidden, player)
        }
    }

    protected conquerBlock(block: BlockData, player: PlayerData): void {

        if (block.ownerName !== player.name) {
            this.removeBlock(block, this.getPlayerData(block.ownerName))
        }

        if (!this.isWater(block)) {
            player.blocks.push(block)
        }

        block.ownerName = player.name
        this.setSurroundingsVisibility(block, Visibility.visible, player)
    }
}

export default PlayersStateManager
