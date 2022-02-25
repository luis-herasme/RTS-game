import { NONE_PLAYER_DATA } from "../constants"
import Move from "./MoveSM"
import { BlockData, PlayerData, Visibility } from "./stateManagementTypes"


class PopulationGrowthSM extends Move {

    private settlementUpdateTime: number = 3000
    private nonSettlementUpdateTime: number = 5000

    private updateNonSettlementBlocksPopulation(): void {
        this.eachBlock((block: BlockData) => {
            if (block.ship && block.type !== "SHIP") {
                block.population = block.population - 1
                if (block.population < 1) {
                    this.deleteBoat(block)
                }
                block.dirty = true
            }
            else if ((block.ownerName !== NONE_PLAYER_DATA.name) && !this.isSettlement(block)) {
                block.population = block.population + 1
                block.dirty = true
            }
        })
    }

    private updateSettlementPopulation(): void {
        this.eachBlock((block: BlockData) => {
            if ((block.ownerName !== NONE_PLAYER_DATA.name) && this.isSettlement(block)) {
                block.population = block.population + (block.level + 1)
                block.dirty = true
            }
        })
    }

    public updateBlocksPopulation(): void {
        // Increase population of blocks that are not settlements
        setInterval(
            this.updateNonSettlementBlocksPopulation.bind(this),
            this.nonSettlementUpdateTime
        )

        // Increase population of settlements
        setInterval(
            this.updateSettlementPopulation.bind(this),
            this.settlementUpdateTime
        )
    }

    private deleteBoat(block: BlockData): void {
        const previousOwnerName = block.ownerName
        const player: PlayerData = this.getPlayerData(previousOwnerName)

        block.ownerName = NONE_PLAYER_DATA.name
        block.previousOwnerName = previousOwnerName
        block.ship = false

        this.setSurroundingsVisibility(block, Visibility.hidden, player)
    }
}

export default PopulationGrowthSM
