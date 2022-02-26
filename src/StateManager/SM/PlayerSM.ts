import { NONE_PLAYER_DATA } from "../../constants"
import { BlockData, BlockPosition, PlayerData, Visibility } from "../stateManagementTypes"
import StateVisibility from "./VisibilitySM"

class PlayersStateManager extends StateVisibility {

    public getBlockSeletec(playerName: string): BlockPosition | null {
        const blockSelected = this.getPlayerData(playerName).blockSelected?.position
        if (blockSelected === undefined) {
            return null
        }
        return blockSelected
    }

    private removeBlock(block: BlockData, player: PlayerData): void {
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

    public checkIfAlive(player: PlayerData): void {
        const capital: BlockData = this.getBlockAt(player.capital)

        if (capital.ownerName !== player.name) {
            if (player.alive) {
                const newOwner: PlayerData = this.getPlayerData(capital.ownerName)
                this.transferAllBlocksTo(player, newOwner)
                // TODO: ADD some kind of message: alert(`${this.capital.owner.name} KILLED ${this.name}`)
            }
            player.alive = false
        }
    }

    private transferAllBlocksTo(prevOwner: PlayerData, newOwner: PlayerData) {
        prevOwner.blocks.forEach((block: BlockData) => {
            this.conquerBlock(block, newOwner)
        })
    }
}

export default PlayersStateManager
