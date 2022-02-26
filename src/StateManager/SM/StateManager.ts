import PopulationGrowthSM from "./PopulationGrowthSM"
import { BlockData, BlockDataValidToAPlayer, BlockPosition, PlayerData, Visibility } from "../stateManagementTypes"


class StateManager extends PopulationGrowthSM {

    private updatePeriod: number = 100

    public start(): void {
        setInterval(() => {
            this.update()
        }, this.updatePeriod)
    }

    private update() {
        const players: Array<PlayerData> = Array.from(this.state.players.values())
        for (let player of players) {
            if (player.name !== "NONE") {
                this.checkIfAlive(player)
            }

            if (player.alive && player.blockSelected?.ownerName !== player.name) {
                player.blockSelected = this.getBlockAt(player.capital)
            }
        }
    }

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

        const visibility: Visibility | undefined = block.visibility.get(playerName)
        const player: PlayerData = this.getPlayerData(block.ownerName)

        if (visibility === undefined) {
            throw Error("Visibility for this player is not defined.")
        }

        const color: string | undefined  = player.color

        if (color === undefined) {
            throw Error("Color for this player is not defined.")
        }

        return {
            ownerName: block.ownerName,
            color: color,
            position: {
                x: block.position.x,
                y: block.position.y
            },
            population: block.population,
            type: block.type,
            level: block.level,
            ship: block.ship,
            visibility: visibility,
            canBeConquer: block.canBeConquer
        }
    }
}

export default StateManager
