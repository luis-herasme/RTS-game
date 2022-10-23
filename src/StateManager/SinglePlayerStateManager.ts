import Player from '../Player';
import Scene from '../Scene';
import { BlockDataValidToAPlayer, BlockPosition, GameConfiguration, PlayerDisplayData } from './stateManagementTypes';
import StateManager from './StateManager';
import { generateStateFromGameConfiguration } from './stateGenerator';
import AI from '../AI';

class SinglePlayerStateManager {
    private player: Player;
    private scene: Scene;
    private stateManager: StateManager;

    constructor(player: Player, scene: Scene, configuration: GameConfiguration) {
        this.player = player;
        this.scene = scene;

        // State Configuration
        const initialState = generateStateFromGameConfiguration(configuration);
        const stateManager = new StateManager(initialState);
        stateManager.start();

        for (const aiData of initialState.players.values()) {
            if (aiData.bot) {
                const ai = new AI(aiData.name, aiData.color, aiData.capital, stateManager);
                ai.start();
            }
        }

        this.stateManager = stateManager;
    }

    public update() {
        this.updateBlockSelected();
        this.updateBlocks();
    }

    public updateBlocks() {
        const newState: Array<BlockDataValidToAPlayer> = this.stateManager.getBoardState(this.player.name);
        for (let blockNewData of newState) {
            const block = this.scene.getBlockAt(blockNewData.position.x, blockNewData.position.y);
            block.updateState(blockNewData);
        }
    }

    public updateBlockSelected() {
        const playerData = this.stateManager.getPlayerData(this.player.name);

        if (playerData.blockSelected !== null) {
            this.player.cursor.blockSelected =
                this.scene.map[playerData.blockSelected.position.y][playerData.blockSelected.position.x];
        }
    }

    // API

    public levelUpBlockSelected(playerName: string): void {
        this.stateManager.levelUpBlockSelected(playerName);
    }

    public getLeaderBoard(): Array<PlayerDisplayData> {
        return this.stateManager.getLeaderBoard();
    }

    public move(
        newBlockPosition: BlockPosition,
        prevBlockPosition: BlockPosition,
        playerName: string,
        moveHalf: boolean = false
    ): boolean {
        return this.stateManager.move(newBlockPosition, prevBlockPosition, playerName, moveHalf);
    }

    public setBlockSelectedFromClick(playerName: string, blockPosition: BlockPosition) {
        this.stateManager.setBlockSelectedFromClick(playerName, blockPosition);
    }

    public getWinner(): string | null {
        return this.stateManager.getWinner();
    }

    public checkIfAlive(): boolean {
        return this.stateManager.checkIfAlive(this.player.name);
    }
}

export default SinglePlayerStateManager;
