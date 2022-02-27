import "./mainWindow.css"
import { ConfigureGameWindow } from "./configureGameWindow"
import { useContext, useEffect, useState } from "react"
import { PageContext } from "./screensManager"
import React from "react"



export function MainWindow() {
    const [name, setName] = useState('')
    const goTo = useContext(PageContext)

    function setUserName(e) {
        localStorage.setItem('user_name', e.target.value)
        setName(e.target.value)
    }

    useEffect(() => {
        const nameSaved = localStorage.getItem('user_name')
        if (nameSaved !== null) {
            setName(nameSaved)
        }
    }, [])

    return (
        <div id="screen">
            <h1>Project block-wars</h1>
            
            <p>
                Name: <input type="text" value={name} onChange={setUserName}/>
            </p>

            <button onClick={goTo(<ConfigureGameWindow />)}>Single player</button>
        </div>
    )
}
