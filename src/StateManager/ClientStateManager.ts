import { io } from "socket.io-client"
import Player from "../Player"
import Scene from "../Scene"
import { BlockDataValidToAPlayer, BlockPosition, PlayerDisplayData } from "./stateManagementTypes"

class NetworkClientStateManager {
    private serverURL: string = "http://localhost:3000/"
    private socket = io(this.serverURL, { transports: ['websocket'] })
    private player: Player
    private scene: Scene

    constructor(player: Player, scene: Scene) {
        this.player = player
        this.scene = scene

        this.socket.emit("alo", player.name)
        console.log("Conecting to server...")
        this.socket.on("welcome", (message) => {
            console.log(message)
        })
    }

    public update() {
        this.updateBlockSelected()
        this.updateBlocks()
    }

    public updateBlocks() {
        const newState: Array<BlockDataValidToAPlayer> = this.getBoardState()
        for (let blockNewData of newState) {
            const block = this.scene.getBlockAt(blockNewData.position.x, blockNewData.position.y)
            block.updateState(blockNewData)
        }
    }

    private getBoardState() {
        return this.boardState
    }

    private winner: string | null = null
    private alive: boolean = true
    private leaderBoard: Array<PlayerDisplayData> = []
    private blockSelectedPosition: BlockPosition | null = null
    private boardState: Array<BlockDataValidToAPlayer> = []

    public start() {
        // getWinner
        this.socket.on('winner', (data) => {
            this.winner = data
        })
        // checkIfAlive
        this.socket.on('alive', (data) => {
            this.alive = data
        })
        // getLeaderBoard
        this.socket.on("leaderBoard", (data) => {
            this.leaderBoard = data
        })
        // updateBlockSelected
        this.socket.on("updateBlockSelected", (data) => {
            this.blockSelectedPosition = data
            this.updateBlockSelected()
        })
        // getBoardState
        this.socket.on("updateBoardState", (data) => {
            this.boardState = data
        })
    }

    // Get
    public getWinner(): string | null {
        return this.winner
    }

    // Get
    public checkIfAlive(): boolean {
        return this.alive
    }

    // Get
    public getLeaderBoard(): Array<PlayerDisplayData> {
        return this.leaderBoard
    }

    // Get
    public updateBlockSelected() {
        if (this.blockSelectedPosition !== null) {
            this.player.cursor.blockSelected = this.scene.map[this.blockSelectedPosition.y][this.blockSelectedPosition.x]
        }
    }

    // Set
    public move(newBlockPosition: BlockPosition, prevBlockPosition: BlockPosition, playerName: string, moveHalf: boolean = false) {
        this.socket.emit("move", {newBlockPosition, prevBlockPosition, playerName, moveHalf})
        // return this.stateManager.move(newBlockPosition, prevBlockPosition, playerName, moveHalf)
    }

    // Set
    public setBlockSelectedFromClick(playerName: string, blockPosition: BlockPosition): void {
        this.socket.emit("setBlockSelectedFromClick", {playerName, blockPosition})
    }

    // Set
    public levelUpBlockSelected(playerName: string): void {
        this.socket.emit("levelUpBlockSelected", {playerName})
    }
}

export default NetworkClientStateManager
