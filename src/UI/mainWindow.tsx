import "./mainWindow.css"
import { ConfigureGameWindow } from "./configureGameWindow"
import { useContext } from "react"
import { PageContext } from "./screensManager"

export function MainWindow() {
    const goTo = useContext(PageContext)

    return (
        <div id="screen">
            <h1>Project block-wars</h1>
            
            <p>
                Name: <input type="text"/>
            </p>

            <button onClick={goTo(<ConfigureGameWindow />)}>Single player</button>
        </div>
    )
}
