import { BlockData, BlockPosition, PlayerData, State } from "../stateManagementTypes"

class BaseStateManager {
    protected state: State = {} as State
    private stateSetted:  boolean = false

    public loadState(state: State) {
        if (!this.stateSetted) {
            this.state = state
            this.stateSetted = true

            console.log("State loaded: ", this.state)
        }
    }

    public getPlayerData(playerName: string): PlayerData {
        const player: PlayerData | undefined = this.state.players.get(playerName)

        if (player == undefined) {
            throw Error("playerName provided is not defined in the state. playerName provided: " + playerName)
        }

        return player
    }

    // TODO: ALGO QUE PODRIA IR EN MAP
    protected validPosition({x, y}: BlockPosition) {
        return (
            (x < this.state.map.length) ||
            (x >= 0) ||
            (y < this.state.map.length) ||
            (y >= 0)
        )
    }

    // TODO: ALGO QUE PODRIA IR EN MAP
    protected getBlockAt(position: BlockPosition): BlockData | null {
        if (this.validPosition(position)) {
            return this.state.map[position.y][position.x]
        }
        return null
    }

    // TODO: ALGO QUE PODRIA IR EN MAP
    // Applies a given function to each block
    protected eachBlock(fn: Function) {
        for (let y = 0; y < this.state.map.length; y++) {
            for (let x = 0; x < this.state.map[y].length; x++) {
                fn(this.state.map[y][x])
            }
        }
    }
}

export default BaseStateManager