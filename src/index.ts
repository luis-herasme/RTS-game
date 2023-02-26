import GameManager from './GameManager';
import Player from './Player';
import Scene from './Scene';
import { GameConfiguration } from './StateManager/stateManagementTypes';
import SinglePlayerStateManager from './StateManager/SinglePlayerStateManager';

function getUserPlayerFromConfiguration(configuration: GameConfiguration): Player {
    for (let playerData of configuration.players) {
        if (localStorage.getItem('user_name') == playerData.name) {
            return new Player(playerData.name, playerData.color, playerData.capital);
        }
    }

    throw Error('User player not found in game configuration');
}

export function startSinglePlayerGame(configuration: GameConfiguration) {
    let player: Player = getUserPlayerFromConfiguration(configuration);
    const scene = new Scene(configuration.map);
    const singlePlayerStateManager = new SinglePlayerStateManager(configuration);
    const gameManager = new GameManager(scene, player, singlePlayerStateManager);
    gameManager.start();
}
