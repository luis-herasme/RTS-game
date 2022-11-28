import StateManager from './StateManager';
import { LevelUpBlockSelected, Move, ReadMessages, SetBlockSelected, WriteMessages } from './messageTypes';
import { EventBus } from '../util/EventBus';

export class StateConnector {
    private stateManager: StateManager;

    constructor(stateManager: StateManager, eventBus: EventBus<ReadMessages, WriteMessages>) {
        this.stateManager = stateManager;
    }

    private move(message: Move) {
        this.stateManager.move(message.to, message.from, message.id, message.moveHalf);
    }

    private setBlockSelected(message: SetBlockSelected) {
        this.stateManager.setBlockSelectedFromClick(message.id, message.position);
    }

    private levelUpBlockSelected(message: LevelUpBlockSelected) {
        this.stateManager.levelUpBlockSelected(message.id);
    }
}
