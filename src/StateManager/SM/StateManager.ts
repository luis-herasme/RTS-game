import PopulationGrowthSM from "./PopulationGrowthSM"
import { BlockData, BlockDataValidToAPlayer, BlockPosition, PlayerData, PlayerDisplayData, Visibility } from "../stateManagementTypes"

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
                this.updateAlive(player)
            }

            if (player.alive && player.blockSelected?.ownerName !== player.name) {
                player.blockSelected = this.getBlockAt(player.capital)
            }
        }
    }

    public checkIfAlive(playerName: string): boolean {
        const player = this.state.players.get(playerName)
        if (player === undefined) {
            console.warn("Player requested to check if alive is not defined.")
            return false
        } else {
            return player.alive
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

    public getWinner(): string | null {
        let totalPlayersStanding: number = 0
        let winnerName: string = ""

        this.leaderBoard.forEach((player: PlayerDisplayData) => {
            if (player.population > 0) {
                totalPlayersStanding += 1
                winnerName = player.name
            }
        })
    
        if (totalPlayersStanding == 1) {
            return winnerName
        } else {
            return null
        }
    }


    private getPlayerPopulation(player: PlayerData): number {
        let totalPopulation: number = 0
        for (let i = 0; i < player.blocks.length; i++) {
            totalPopulation += player.blocks[i].population
        }
        return totalPopulation
    }

    private leaderBoard: Array<PlayerDisplayData> = []

    public getLeaderBoard(): Array<PlayerDisplayData> {
        const playersData: Array<PlayerData> = Array.from(this.state.players.values())
        const playersDisplayData: Array<PlayerDisplayData> = playersData.map((player: PlayerData) => {
            return {
                name: player.name,
                territories: player.blocks.length,
                color: player.color,
                population: this.getPlayerPopulation(player)
            }
        })
        const playersDisplayDataWithoutNone: Array<PlayerDisplayData> = playersDisplayData.filter((player: PlayerDisplayData) => (player.name !== "NONE"))
        this.leaderBoard = playersDisplayDataWithoutNone
        return playersDisplayDataWithoutNone
    }

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

    private BLOCK_MAX_LEVE: number = 3

    public levelUpBlock(blockPosition: BlockPosition): void {
        const block: BlockData = this.getBlockAt(blockPosition)
        if (this.isSettlement(block)) {
            if (block.level == this.BLOCK_MAX_LEVE) {
                console.warn("Block cannot level up it is in the max level.")
            } else {
                if (block.population > 10 * block.level + 10) {
                    block.population = block.population - (10 * block.level + 10)
                    block.level = block.level + 1
                } else {
                    console.log("You need more than: ", 10 * block.level + 10, " units in this block.")
                }
            }
        }
    }

}

export default StateManager
