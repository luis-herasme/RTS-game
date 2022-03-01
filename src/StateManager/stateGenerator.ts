import { setVisibility } from "./generateStateFromScene"
import { BlockData, PlayerData, PlayerConfiguration, State, GameConfiguration, Visibility } from "./stateManagementTypes"
import StateMap from "./StateMap"

function generateMapStateFromMap(map: Array<Array<string>>) {
    const mapState: Array<Array<BlockData>> = []
    for (let y = 0; y < map.length; y++) {
        mapState.push([])
        for (let x = 0; x < map[y].length; x++) {
            mapState[y][x] = generateBlockData(map[y][x], x, y)
        }
    }
    return mapState
}

function canBeConquer(type: string): boolean {
    return (type[0] != "W" && type != "MOUNTAIN")
}

function setCapitals(map: Array<Array<BlockData>>, playersDescription: Array<PlayerConfiguration>): Array<Array<BlockData>> {
    for (let playerDescription of playersDescription) {
        const {x, y} = playerDescription.capital
        map[y][x].ownerName = playerDescription.name
    }
    return map
}

function generateBlockData(type: string, x: number, y: number): BlockData {
    const visibility = new Map<string, Visibility>()

    let level = 0
    let population = 0

    if (type == "H") {
        level = 0
        population = 5
    }
    else if (type == "TOWER_LEVEL_1") {
        level = 1
        population = 10
    } 
    else if (type == "TOWER_LEVEL_2") {
        level = 2
        population = 50
    }
    else if (type == "TOWER_LEVEL_3") {
        level = 3
        population = 100
    }
    else if (type == "SHIP") {
        population = 2
    }

    return {
        ownerName: "NONE",
        previousOwnerName: "NONE",
        position: { x, y },
        population,
        type: type,
        level,
        ship: false,
        visibility: visibility,
        canBeConquer: canBeConquer(type),
        dirty: true
    }
}

function dataFromPlayerDescription(playerDescription: PlayerConfiguration, map: Array<Array<BlockData>>): PlayerData {
    return {
        name: playerDescription.name,
        alive: true,
        color: playerDescription.color,
        blocks: [map[playerDescription.capital.y][playerDescription.capital.x]],
        canGoOnWater: false,
        blockSelected: null,
        population: 0,
        capital: playerDescription.capital,
        bot: playerDescription.bot
    }
}

function playersDataFromPlayersDescriptions(playersDescriptions: Array<PlayerConfiguration>, map: Array<Array<BlockData>>): Map<string, PlayerData> {
    const playersData: Map<string, PlayerData> = new Map<string, PlayerData>()
    for (let playerDescription of playersDescriptions) {
        playersData.set(playerDescription.name, dataFromPlayerDescription(playerDescription, map))
    }
    return playersData
}

export function generateStateFromGameConfiguration(stateDescription: GameConfiguration): State {
    const playersNames: Array<string> = stateDescription.players.map((x: PlayerConfiguration) => x.name)
    let map = generateMapStateFromMap(stateDescription.map)

    stateDescription.players.push({
        name: "NONE",
        color: "",
        capital: {x: 0, y: 0},
        bot: false
    })

    map = setCapitals(map, stateDescription.players)

    stateDescription.players
    const players = playersDataFromPlayersDescriptions(stateDescription.players, map)
    setVisibility(map, playersNames)

    return { map: new StateMap(map), players }
}
