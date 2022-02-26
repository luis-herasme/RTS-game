import { setVisibility } from "./generateStateFromScene"
import { BlockData, PlayerData, PlayerDescription, State, StateDescriptor, Visibility } from "./stateManagementTypes"

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

function setCapitals(map: Array<Array<BlockData>>, playersDescription: Array<PlayerDescription>): Array<Array<BlockData>> {
    for (let playerDescription of playersDescription) {
        const {x, y} = playerDescription.capital
        map[y][x].ownerName = playerDescription.name
    }
    return map
}

function generateBlockData(type: string, x: number, y: number): BlockData {
    const visibility = new Map<string, Visibility>()
    // visibility.set(block.owner.name, Visibility.visible)
    return {
        ownerName: "NONE",
        previousOwnerName: "NONE",
        position: { x, y },
        population: 0,
        type: type,
        level: 0,
        ship: false,
        visibility: visibility,
        canBeConquer: canBeConquer(type),
        dirty: true
    }
}

function dataFromPlayerDescription(playerDescription: PlayerDescription, map: Array<Array<BlockData>>): PlayerData {
    return {
        name: playerDescription.name,
        alive: true,
        color: playerDescription.color,
        blocks: [map[playerDescription.capital.y][playerDescription.capital.x]],
        canGoOnWater: false,
        blockSelected: null,
        population: 0,
        capital: playerDescription.capital
    }
}

function playersDataFromPlayersDescriptions(playersDescriptions: Array<PlayerDescription>, map: Array<Array<BlockData>>): Map<string, PlayerData> {
    const playersData: Map<string, PlayerData> = new Map<string, PlayerData>()
    for (let playerDescription of playersDescriptions) {
        playersData.set(playerDescription.name, dataFromPlayerDescription(playerDescription, map))
    }
    return playersData
}

export function stateGenerator(stateDescription: StateDescriptor): State {
    const playersNames: Array<string> = stateDescription.players.map((x: PlayerDescription) => x.name)
    let map = generateMapStateFromMap(stateDescription.map)
    map = setCapitals(map, stateDescription.players)

    stateDescription.players
    const players = playersDataFromPlayersDescriptions(stateDescription.players, map)
    setVisibility(map, playersNames)

    return { map, players }
}
