import './mainWindow.css';
import { ConfigureGameWindow } from './configureGameWindow';
import { useContext, useEffect, useState } from 'react';
import { PageContext } from './screensManager';
import React from 'react';
import { ConfigureMultiplayerGameWindow } from './ConfigureMultiplayerGameWindow';

export function MainWindow() {
    const [name, setName] = useState('');
    const goTo = useContext(PageContext);

    function setUserName(e: React.ChangeEvent<HTMLInputElement>) {
        localStorage.setItem('user_name', e.target.value);
        setName(e.target.value);
    }

    useEffect(() => {
        const nameSaved = localStorage.getItem('user_name');
        if (nameSaved !== null) {
            setName(nameSaved);
        }
    }, []);

    return (
        <div id="screen">
            <h1 className="underline">Project block-wars</h1>
            <p>
                Name: <input className="text-black" type="text" value={name} onChange={setUserName} />
            </p>
            <button onClick={goTo(<ConfigureMultiplayerGameWindow />)}>Multiplayer</button>

            <button style={{ marginLeft: 20 }} onClick={goTo(<ConfigureGameWindow />)}>
                Singleplayer
            </button>
        </div>
    );
}
