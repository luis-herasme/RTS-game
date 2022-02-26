import { NONE_PLAYER_DATA } from "../../constants"
import PlayersStateManager from "./PlayerSM"
import { BlockData, BlockPosition, PlayerData, Visibility } from "../stateManagementTypes"

class Move extends PlayersStateManager {

    public move(newBlockPosition: BlockPosition, prevBlockPosition: BlockPosition, playerName: string, moveHalf: boolean = false): boolean {
        const newBlock: BlockData = this.getBlockAt(newBlockPosition)
        const prevBlock: BlockData = this.getBlockAt(prevBlockPosition)
        const player: PlayerData = this.getPlayerData(playerName)
    
        return this.moveHelper(newBlock, prevBlock, player, moveHalf)
    }

    private moveHelper(newBlock: BlockData, prevBlock: BlockData, player: PlayerData, moveHalf: boolean = false): boolean {
        if (this.isOnBorder(newBlock)) return false
        let moved = false

        // If you are the owner of the previous block
        // and, the new block can be conquer
        // or you can go on water and the block is of type water
        // then you can move
        if ((prevBlock.ownerName == player.name) && (newBlock.canBeConquer || (player.canGoOnWater && this.isWater(newBlock)))) {

            let populationToMove = prevBlock.population - 1

            if (moveHalf) {
                populationToMove = Math.round(prevBlock.population / 2)
            }

            moved = this.moveUnits(newBlock, prevBlock, populationToMove)

            // If you are in a boat and you moved to a block that is on water
            if (prevBlock.ship && player.canGoOnWater && moved) {
                newBlock.ship = true
                newBlock.population = newBlock.population + 1 // Reverse the efect of moving units
            }

            // If you were in a boat and moved; remove the boat in previous block
            if (moved && !moveHalf) {
                prevBlock.ship = false
                if (this.isWater(prevBlock)) {
                    this.clearBlock(prevBlock, player)
                }
            }
        }

        if (moved) {
            if (newBlock.ownerName != player.name) {
                this.conquerBlock(newBlock, player)
            }
            this.setBlockSelected(newBlock, player)
            newBlock.dirty = true
            prevBlock.dirty = true
            return true
        } else {
            return false
        }
    }

    protected setBlockSelected(block: BlockData, player: PlayerData): void {
        player.blockSelected = block

        if (player.blockSelected.type == "SHIP" || player.blockSelected.ship == true) {
            player.canGoOnWater = true
            player.blockSelected.ship = true
        }

        if (!this.isWater(player.blockSelected) && player.blockSelected.type != "SHIP") {
            player.canGoOnWater = false
            player.blockSelected.ship = false
        }
    }

    private moveUnits(newBlock: BlockData, prevBlock: BlockData, populationToMove: number): boolean {
        // If you are not the owner of the new block
        if (newBlock.ownerName != prevBlock.ownerName) {
            
            // If your population is too low you cant conquer
            if (prevBlock.population <= 1) return false

            // If your poplation is greater you can conquer
            if (populationToMove > newBlock.population) {
                newBlock.population = populationToMove - newBlock.population
                prevBlock.population = prevBlock.population - populationToMove
                return true
            }

            // If your population is leasser you can attack
            else {
                newBlock.population = newBlock.population - populationToMove
                prevBlock.population = prevBlock.population - populationToMove
                
                newBlock.dirty = true
                prevBlock.dirty = true

                return false
            }
        }

        // If that block is yours, you move your population
        else {
            newBlock.population = populationToMove + newBlock.population
            prevBlock.population = prevBlock.population - populationToMove
            return true
        }
    }

    private clearBlock(block: BlockData, player: PlayerData): void {
        block.population = 0
        block.ownerName = NONE_PLAYER_DATA.name
        block.previousOwnerName = player.name
        this.setSurroundingsVisibility(block, Visibility.hidden, player)
    }
}

export default Move
