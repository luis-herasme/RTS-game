import { BlockDataValidToAPlayer, BlockPosition, PlayerDisplayData } from './stateManagementTypes';

// Messages to StateManager

export type SetBlockSelected = {
    id: string;
    type: 'set-block-selected';
    position: BlockPosition;
};

export type Move = {
    id: string;
    type: 'move';
    from: BlockPosition;
    to: BlockPosition;
    moveHalf: boolean;
};

export type LevelUpBlockSelected = {
    id: string;
    type: 'level-up-block-selected';
};

export type WriteMessages = SetBlockSelected | Move | LevelUpBlockSelected;

// Messages from StateManager

export type Kill = {
    type: 'kill';
    from: {
        id: string;
        name: string;
    };
    to: {
        id: string;
        name: string;
    };
};

export type LeaderBoard = {
    type: 'leader-board';
    leaderBoard: PlayerDisplayData[];
};

export type Winner = {
    type: 'winner';
    winnerId: string;
};

export type BlockSelected = {
    type: 'block-selected';
    position: BlockPosition;
};

export type PlayerData = {
    type: 'player-data';
    data: PlayerData;
};

export type BoardState = {
    type: 'board-state';
    data: BlockDataValidToAPlayer[];
};

export type ReadMessages = Kill | LeaderBoard | Winner | BlockSelected | PlayerData | BoardState;
