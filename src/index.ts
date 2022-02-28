import { MAP } from "./constants"
import GameManager from "./GameManager"
import Player from "./Player"
import AI from "./AI"
import Scene from "./Scene"
import { generateStateFromScene } from "./StateManager/generateStateFromScene"
import StateManager from "./StateManager/SM/StateManager"

// Debe ir con MAP
const positions = [
    {
        x: 4,
        y: 15
    },
    {
        x: 4,
        y: 4
    },
    {
        x: 16,
        y: 4
    },
    {
        x: 16,
        y: 15
    }
]

interface playerConfiguration {
    name: string
    color: string
}

export function startGame(config: Array<playerConfiguration>) {

    // Single player
    const stateManager = new StateManager()
    const scene = new Scene(MAP)

    const player = new Player(config[0].name, config[0].color, positions[0])
    const capital = scene.getBlockAt(positions[0].x, positions[0].y)
    capital.ownerName = player.name
    capital.color = player.color
    capital.population = 100

    const ais = []

    for (let i = 1; i < config.length; i++) {
        const capital = scene.getBlockAt(positions[i].x, positions[i].y)
        const aiData = config[i]


        const ai = new AI(
            aiData.name, 
            aiData.color,
            positions[i],
            stateManager
        )
        capital.population = 5
        capital.color = ai.color
        capital.ownerName = ai.name

        ais.push(ai)
    }
    
    // State Manager
    const initialState = generateStateFromScene(scene.map)
    stateManager.loadState(initialState)
    stateManager.updateBlocksPopulation()

    const gameManager = new GameManager(scene, player, stateManager)

    ais.forEach(ai => ai.start())

    stateManager.start()
    gameManager.start()
}
