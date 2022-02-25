import { useEffect } from "react"
import { startGame } from "../index"

export function GameWindow({config}) {

    useEffect(() => {
        startGame(config)
    }, [])

    return (
        <>
            <canvas></canvas>
            <div id="population"></div>
            <div id="levelUp">LEVEL UP</div>

            <div id="LeaderBoard">
                <p>Leader board</p>
                <hr />
                <div id="playersLeaderBoard">
                </div>
            </div>
            <div id="FPS">FPS:</div>
        </>
    )
}
