import PopulationGrowthSM from "./PopulationGrowthSM"
import { BlockData, BlockDataValidToAPlayer, BlockPosition, Visibility } from "./stateManagementTypes"


class StateManager extends PopulationGrowthSM {
  
    // API
    // TODO: Make this work with player ID, a random ID generated in the player browser 
    public getBoardState(playerName: string): Array<BlockDataValidToAPlayer> {
        const data: Array<BlockDataValidToAPlayer> = []
        this.eachBlock((block: BlockData) => {
            if (this.isNextToPlayer(block, playerName) || this.wasNextToPlayer(block, playerName)) {
                if (block.dirty) {
                    const validData = this.getBlockValidDataToPlayer(block, playerName)
                    data.push(validData)
                }
                block.dirty = false
            }
        })
        return data
    }

    public setBlockSelectedFromClick(playerName: string, blockPosition: BlockPosition): boolean {
        const block = this.getBlockAt(blockPosition)
        if (block.ownerName == playerName) {
            this.setBlockSelected(block, this.getPlayerData(playerName))
            return true
        }
        return false
    }

    // ! END API

    private getBlockValidDataToPlayer(block: BlockData, playerName: string): BlockDataValidToAPlayer {
        return {
            ownerName: block.ownerName,
            color: this.state.players[block.ownerName].color,
            position: {
                x: block.position.x,
                y: block.position.y
            },
            population: block.population,
            type: block.type,
            level: block.level,
            ship: block.ship,
            visibility: block.visibility[playerName],
            canBeConquer: block.canBeConquer,
        }
    }
}

export default StateManager
