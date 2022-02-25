import "./mainWindow.css"
import "./configureGameWindow.css"
import { useContext, useEffect, useState } from "react"
import { MainWindow } from "./mainWindow"
import { PageContext } from "./screensManager"
import { PlayerCard } from "./Components/PlayerCard"
import { GameWindow } from "./gameWindow"

const MAX_BOTS = 3

const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#00ffff",
    "#ffffff"
]

function checkIfPropIsTaken(name, prop, players) {
    for (let i = 0; i < players.length; i++) {
        if (name == players[i].props[prop]) {
            return true
        }
    }
    return false
}

function findValidName(players) {
    let name = ""
    let nameNumber = 1

    while (true) {
        name = "Bot " + nameNumber
        if (checkIfPropIsTaken(name, "name", players)) {
            nameNumber += 1
        } else {
            return name
        }
    }
}

function findRandomValidColor(players) {
    const validColors = getValidColors(players)
    const randomValidColorIdx = Math.round(Math.random() * (validColors.length - 1))
    return validColors[randomValidColorIdx]
}

function getValidColors(players) {
    const colorsTaken = players.map(player => player.props.color)
    return colors.filter(
        color => !colorsTaken.includes(color)
    )
}

export function ConfigureGameWindow(): JSX.Element {
    const goTo = useContext(PageContext)
    const [players, setPlayers] = useState([])

    const removePlayer = (name) => {
        return (() => {
            setPlayers(prevPlayersState => {
                const newPlayersState = prevPlayersState.filter(player => player.props.name !== name)
                return updateAllPlayersValidColors(newPlayersState, removePlayer)
            })
        })
    }

    function updateAllPlayersValidColors(players, removePlayer) {
        const updatedValidColors = getValidColors(players)
        const newPlayersState = []

        for (let player of players) {
            newPlayersState.push(
                <PlayerCard
                    name={player.props.name}
                    key={`${Math.floor((Math.random() * 10000))}-min`}
                    color={player.props.color}
                    validColors={updatedValidColors}
                    removePlayer={removePlayer}
                    setColor={player.props.setColor}
                />
            )
        }

        return newPlayersState
    }

    const setColor = (name, setPlayers) => {
        return (color) => {
            setPlayers(prev => {
                const newPlayersState = []
                for (let player of prev) {
                    let newPlayer
                    if (player.props.name == name) {
                        newPlayer = <PlayerCard
                            name={player.props.name}
                            key={player.props.name}
                            color={color}
                            validColors={player.props.validColors}
                            removePlayer={removePlayer}
                            setColor={setColor(player.props.name, setPlayers)}
                        />
                    } else {
                        newPlayer = player
                    }
                    newPlayersState.push(newPlayer)
                }
                return updateAllPlayersValidColors(newPlayersState, removePlayer)
            })
        }
    }

    function createPlayer(name, color, players) {
        return (
            <PlayerCard
                setColor={setColor(name, setPlayers)}
                name={name}
                key={name}
                color={color}
                validColors={getValidColors(players)}
                removePlayer={removePlayer}
            />)
    }


    function addBot() {
        setPlayers((prevPlayers) => {
            if (prevPlayers.length <= MAX_BOTS) {
                const name = findValidName(prevPlayers)
                const color = findRandomValidColor(prevPlayers)
                const newPlayer = createPlayer(name, color, players)
                const prevPlayersAndNewPlayer = [...prevPlayers, newPlayer]
                return updateAllPlayersValidColors(prevPlayersAndNewPlayer, removePlayer)
            }
            return prevPlayers
        })
    }

    const userName = "Luis"

    useEffect(() => {
        const mainPlayer = createPlayer(userName, findRandomValidColor(players), players)
        setPlayers([mainPlayer])
    }, [])

    function getGameConfigurationData() {
        const data = []
        for (let player of players) {
            data.push({
                name: player.props.name,
                color: player.props.color,
                bot: player.props.name != userName
            })
        }
        return data
    }

    return (
        <div id="screen">
            <div id="gameConfiguUI">
                <div>
                    <div style={{ textAlign: "left", marginTop: "5vh" }}>
                        <button onClick={goTo(<MainWindow />)}>Go back</button>
                    </div>
                    <div style={{ marginTop: "10vh" }}>

                        <img src={require("../../public/map1.png")} alt="" width={"50%"}/>
                        <p>
                            Map:
                            <select name="cars" id="cars" style={{ padding: "15px" }}>
                                <option value="volvo">MAP 1</option>
                            </select>
                        </p>
                    </div>
                </div>

                <div>
                    <div style={{ marginTop: "10vh", textAlign: "left" }}>
                        <p>
                            Players:
                        </p>
                        <div>

                            {players}
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button className={players.length <= MAX_BOTS ? "s" : "disabledButton"} onClick={addBot}>Add bot <b>+</b></button>
                        </div>
                    </div>
                    <hr style={{ height: "3px", border: "none", backgroundColor: "white", marginTop: "10vh" }} />
                    <div style={{ textAlign: "right" }}>
                        <button onClick={goTo(<GameWindow config={getGameConfigurationData()} />)}>Start</button>
                    </div>
                </div>

            </div>

        </div>
    )
}
