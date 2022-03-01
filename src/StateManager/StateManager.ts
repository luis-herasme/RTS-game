import { BlockData, BlockDataValidToAPlayer, BlockPosition, PlayerConfiguration, PlayerData, PlayerDisplayData, State, Visibility } from "./stateManagementTypes"
import { NONE_PLAYER_DATA } from "../constants/constants"
import AI from "../AI"

class StateManager {
    protected state: State = {} as State
    protected stateSetted: boolean = false

    public getPlayerData(playerName: string): PlayerData {
        const player: PlayerData | undefined = this.state.players.get(playerName)

        if (player == undefined) {
            throw Error("playerName provided is not defined in the state. playerName provided: " + playerName)
        }

        return player
    }

    // ! CHECKS

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

    private getPreviousOwnerName(block: BlockData | null): string | null {
        if (block == null) {
            return null
        }
        return block.previousOwnerName
    }

    private getOwnerName(block: BlockData | null): string | null {
        if (block == null) {
            return null
        }
        return block.ownerName
    }

    protected isNextToPlayer(block: BlockData, playerName: string): boolean {
        const surrondingBlocks: Array<BlockData | null> = this.state.map.getSurroundingBlocks(block)

        for (let i = 0; i < surrondingBlocks.length; i++) {
            if (this.getOwnerName(surrondingBlocks[i]) == playerName) {
                return true
            }
        }

        return false
    }

    protected wasNextToPlayer(block: BlockData, playerName: string): boolean {
        const surrondingBlocks: Array<BlockData | null> = this.state.map.getSurroundingBlocks(block)

        for (let i = 0; i < surrondingBlocks.length; i++) {
            if (this.getPreviousOwnerName(surrondingBlocks[i]) == playerName) {
                return true
            }
        }

        return false
    }

    // ! VISIBILITY

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
        const surroundingBlocks: Array<BlockData | null> = this.state.map.getSurroundingBlocks(block)
        for (let i = 0; i < surroundingBlocks.length; i++) {
            this.setBlockVisibility(visibility, surroundingBlocks[i], player)
        }
    }

    // ! Player 

    public getBlockSelected(playerName: string): BlockPosition | null {
        const blockSelected = this.getPlayerData(playerName).blockSelected?.position
        if (blockSelected === undefined) {
            return null
        }
        return blockSelected
    }

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

        player.blocks.push(block)
        block.ownerName = player.name
        this.setSurroundingsVisibility(block, Visibility.visible, player)
    }

    public updateAlive(player: PlayerData): void {
        const capital: BlockData | null = this.state.map.getBlockAt(player.capital)
        if (capital == null) {
            console.warn('Capital position not valid.')
        }
        else if (capital.ownerName !== player.name) {
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

    // ! MOVE

    public move(newBlockPosition: BlockPosition, prevBlockPosition: BlockPosition, playerName: string, moveHalf: boolean = false): boolean {

        if (!this.state.map.validPosition(newBlockPosition) || !this.state.map.validPosition(prevBlockPosition)) {
            return false
        }

        const newBlock: BlockData | null = this.state.map.getBlockAt(newBlockPosition)
        const prevBlock: BlockData | null = this.state.map.getBlockAt(prevBlockPosition)
        const player: PlayerData = this.getPlayerData(playerName)
        if (newBlock == null || prevBlock == null) {
            return false
        }
        return this.moveHelper(newBlock, prevBlock, player, moveHalf)
    }

    private moveHelper(newBlock: BlockData, prevBlock: BlockData, player: PlayerData, moveHalf: boolean = false): boolean {
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
                if (prevBlock.type !== "SHIP") { // Fix: Infinite population bug
                    newBlock.population = newBlock.population + 1 // Reverse the efect of moving units
                }
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
        this.removeBlock(block, player)
        block.population = 0
        block.ownerName = NONE_PLAYER_DATA.name
    }

    // ! POPULATION GROWTH

    private settlementUpdateTime: number = 3000
    private nonSettlementUpdateTime: number = 5000

    private updateNonSettlementBlocksPopulation(): void {
        this.state.map.eachBlock((block: BlockData) => {
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
        this.state.map.eachBlock((block: BlockData) => {
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

    // ! STATE MANAGER


    private updatePeriod: number = 100

    public start(): void {
        this.ais.forEach(ai => ai.start())
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
                player.blockSelected = this.state.map.getBlockAt(player.capital)
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
        this.state.map.eachBlock((block: BlockData) => {
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
        const block = this.state.map.getBlockAt(blockPosition)
        if (block == null) {
            console.warn("Block to be set as block selected is not defined.")
            return false
        }
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

        const color: string | undefined = player.color

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
        const block: BlockData | null = this.state.map.getBlockAt(blockPosition)

        if (block == null) {
            console.warn('Block to level up is no defined in the map.')
            return
        }

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

    private ais: Array<AI> = []

    public loadAI(aiData: PlayerConfiguration) {
        const ai = new AI(
            aiData.name,
            aiData.color,
            aiData.capital,
            this
        )
        this.ais.push(ai)
    }

    public loadState(state: State) {
        if (!this.stateSetted) {
            this.state = state
            this.stateSetted = true

            for (let aiData of this.state.players.values()) {
                if (aiData.bot) {
                    this.loadAI(aiData)
                }
            }

            console.log("State loaded: ", this.state)
        }
    }

    public levelUpBlockSelected(playerName: string): void {
        const block: BlockPosition | null = this.getBlockSelected(playerName)
        if (block !== null) {
            this.levelUpBlock(block)
        }
    }
}

export default StateManager