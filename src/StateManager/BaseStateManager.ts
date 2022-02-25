import { BlockData, BlockPosition, PlayerData, State } from "./stateManagementTypes"

class BaseStateManager {
    protected state: State

    public loadState(state: State) {
        if (this.state === undefined) {
            this.state = state
        }
    }

    public getPlayerData(playerName: string): PlayerData {
        return this.state.players[playerName]
    }

    protected getBlockAt(position: BlockPosition): BlockData {
        return this.state.map[position.y][position.x]
    }

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