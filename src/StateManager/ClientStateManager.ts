import Player from "../Player"
import Scene from "../Scene"
import { BlockDataValidToAPlayer, BlockPosition, PlayerDisplayData } from "./stateManagementTypes"
import StateManager from "./SM/StateManager"

class ClientStateManager {
    private player: Player
    private scene: Scene
    private stateManager: StateManager

    constructor(player: Player, scene: Scene, stateManager: StateManager) {
        this.player = player
        this.scene = scene
        this.stateManager = stateManager
    }

    public update() {
        this.updateBlockSelected()
        this.updateBlocks()
    }

    public updateBlocks() {
        const newState: Array<BlockDataValidToAPlayer> = this.stateManager.getBoardState(this.player.name)
        for (let blockNewData of newState) {
            const block = this.scene.getBlockAt(blockNewData.position.x, blockNewData.position.y)
            block.updateState(blockNewData)
        }
    }

    public levelUpBlockSelected(playerName: string): void {
        const block: BlockPosition | null = this.stateManager.getBlockSeletec(playerName)
        if (block !== null) {
            this.stateManager.levelUpBlock(block)
        }
    }

    public getLeaderBoard(): Array<PlayerDisplayData> {
        return this.stateManager.getLeaderBoard()
    }

    public updateBlockSelected() {
        const playerData = this.stateManager.getPlayerData(this.player.name)

        if (playerData.blockSelected !== null) {
            this.player.cursor.blockSelected = this.scene.map[playerData.blockSelected.position.y][playerData.blockSelected.position.x]
        }
    }

    public move(newBlockPosition: BlockPosition, prevBlockPosition: BlockPosition, playerName: string, moveHalf: boolean = false): boolean {
        return this.stateManager.move(newBlockPosition, prevBlockPosition, playerName, moveHalf)
    }

    public setBlockSelectedFromClick(playerName: string, blockPosition: BlockPosition): boolean {
        return this.stateManager.setBlockSelectedFromClick(playerName, blockPosition)
    }

    public getWinner(): string | null {
        return this.stateManager.getWinner()
    }

    public checkIfAlive(playerName: string): boolean {
        return this.stateManager.checkIfAlive(playerName)
    }
}

export default ClientStateManager
