import { BlockPosition, GameConfiguration } from './stateManagementTypes';
import StateManager from './StateManager';
import { generateStateFromGameConfiguration } from './stateGenerator';
import AI from '../AI';

class SinglePlayerStateManager {
    private stateManager: StateManager;

    constructor(configuration: GameConfiguration) {
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

    public levelUpBlockSelected(playerName: string): void {
        this.stateManager.levelUpBlockSelected(playerName);
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
}

export default SinglePlayerStateManager;
