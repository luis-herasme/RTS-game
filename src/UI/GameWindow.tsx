import React from 'react';
import { useEffect } from 'react';
import { startSinglePlayerGame } from '../index';
import { GameConfiguration } from '../StateManager/stateManagementTypes';

interface GameConfigurationAsProps {
    configuration: GameConfiguration;
}

export function GameWindow({ configuration }: GameConfigurationAsProps) {
    useEffect(() => {
        startSinglePlayerGame(configuration);
    }, []);

    return (
        <>
            <canvas></canvas>
            <div id="population"></div>
            <div id="levelUp">LEVEL UP</div>

            <div id="LeaderBoard">
                <p>Leader board</p>
                <hr />
                <div id="playersLeaderBoard"></div>
            </div>
            <div id="FPS">FPS:</div>
        </>
    );
}
