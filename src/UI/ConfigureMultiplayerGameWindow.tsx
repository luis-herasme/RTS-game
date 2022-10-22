import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { MultiplayerGame } from './MultiplayerGame';
import { PageContext } from './screensManager';

const serverURL: string = 'http://localhost:3000/';

export function ConfigureMultiplayerGameWindow() {
    const [allGames, setAllGames] = useState([]);
    const [socket, setSocket] = useState({} as Socket);
    const goTo = useContext(PageContext);

    useEffect(() => {
        const socket = io(serverURL, { transports: ['websocket'] });
        socket.emit('get_all_games');
        socket.on('all_games', (data) => {
            setAllGames(data);
        });

        socket.on('get_game', (game) => {
            console.log(' You want to enter', game, 'game');
            socket.emit('connect_to_game', game.id);
            // goTo(<MultiplayerGame />)()
        });

        // Inside multiplayer game
        socket.on('game_data', (data) => {
            console.log('GAME DATA: ', data);
        });

        socket.emit('set_name', localStorage.getItem('user_name'));

        setSocket(socket);
    }, []);

    function createGame() {
        socket.emit('create_game');
    }

    function getGame(e) {
        console.log('Click on get game');
        console.log('e.target.innerText: ', e.target.innerText);
        socket.emit('get_game', e.target.innerText);
    }

    return (
        <>
            <h2>Games</h2>
            {allGames.map((game) => {
                return (
                    <p key={game} onClick={getGame}>
                        {game}
                    </p>
                );
            })}
            <button onClick={createGame}>Create game</button>
        </>
    );
}
