import Block from "../Block"
import { BlockData, BlockPosition, PlayerData, State, Visibility } from "./stateManagementTypes"

// ! This is just for initial scene, capital position is needed

function blockDefined({ position: {x, y} }: BlockData, map: Array<Array<BlockData>>) {
    if (map[y]) {
        if (map[y][x]) {
            return true
        }
    }
    return false
}

function setBlockSurroundingVisibility(block: BlockData, map: Array<Array<BlockData>>): void {
    if (blockDefined(map[block.position.y][block.position.x], map))
        map[block.position.y][block.position.x].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y][block.position.x + 1])
        map[block.position.y][block.position.x + 1].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y][block.position.x - 1])
        map[block.position.y][block.position.x - 1].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y + 1][block.position.x])
        map[block.position.y + 1][block.position.x].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y - 1][block.position.x])
        map[block.position.y - 1][block.position.x].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y + 1][block.position.x + 1])
        map[block.position.y + 1][block.position.x + 1].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y + 1][block.position.x - 1])
        map[block.position.y + 1][block.position.x - 1].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y - 1][block.position.x + 1])
        map[block.position.y - 1][block.position.x + 1].visibility.set(block.ownerName, Visibility.visible)
    if (map[block.position.y - 1][block.position.x + 1])
        map[block.position.y - 1][block.position.x - 1].visibility.set(block.ownerName, Visibility.visible)
}

export function setVisibility(map: Array<Array<BlockData>>, playersNameList: Array<string>): void {

    // Setting all for all players to hidden
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const block = map[y][x]
            for (let playerName of playersNameList) {
                block.visibility.set(playerName, Visibility.hidden)
            }
        }
    }

    // Setting to visible blocks around a player
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const block = map[y][x]
            if (block.ownerName !== "NONE") {
                setBlockSurroundingVisibility(block, map)
            }
        }
    }
}

function getBlockData(block: Block): BlockData {
    const visibility = new Map<string, Visibility>()
    visibility.set(block.owner.name, Visibility.visible)
    return {
        ownerName: block.owner.name,
        previousOwnerName: "NONE",
        position: {
            x: block.x,
            y: block.y,
        },
        population: block.population,
        type: block.type,
        level: block.level,
        ship: block.ship,
        visibility: visibility,
        canBeConquer: block.canBeConquer,
        dirty: true
    }
}

function getPlayerDataFromBlock(block: Block): PlayerData {
    return {
        name: block.owner.name,
        alive: block.owner.alive,
        color: block.owner.color,
        blocks: [], // Changes after
        canGoOnWater: false,
        blockSelected: null,
        population: 0, // Changes after,
        capital: {x: block.x, y: block.y} // Changes after, // ! This is just for initial scene, capital position is needed
    }
}

function getPlayerPopulationFromBlocks(playerBlocksData: Array<BlockData>): number {
    let totalPlayerPopulation = 0
    for (let blockData of playerBlocksData) {
        totalPlayerPopulation += blockData.population
    }
    return totalPlayerPopulation
}

function generateMapStateFromMap(map: Array<Array<Block>>) {
    const mapState: Array<Array<BlockData>> = []
    for (let y = 0; y < map.length; y++) {
        mapState.push([])
        for (let x = 0; x < map[y].length; x++) {
            mapState[y][x] = getBlockData(map[y][x])
        }
    }
    return mapState
}

function getAllPlayersInTheScene(map: Array<Array<Block>>): Array<string> {
    const players: Array<string> = []
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const block = map[y][x]
            players.push(block.owner.name)
        }
    }
    return [...new Set(players)]
}

function generatePlayersStateFromMap(mapState: Array<Array<BlockData>>, map: Array<Array<Block>>): Map<string, PlayerData> {

    // const playersNames: Array<string> = getAllPlayersInTheScene(map)
    const playersBlocksData = new Map<string, Array<BlockData>>()
    const playersData = new Map<string, PlayerData>()

    for (let y = 0; y < mapState.length; y++) {
        for (let x = 0; x < mapState[y].length; x++) {
            const blockData = mapState[y][x]

            if (!playersData.get(blockData.ownerName)) {
                playersData.set(blockData.ownerName, getPlayerDataFromBlock(map[y][x]))
            }

            if (!playersBlocksData.get(blockData.ownerName)) {
                playersBlocksData.set(blockData.ownerName, [])
            }

            const playerBlocksData: Array<BlockData> | undefined = playersBlocksData.get(blockData.ownerName)
            if (playerBlocksData === undefined) {
                throw Error("Player block data is not defined for this player, (An empty array is needed).")
            }
            playerBlocksData.push(blockData)
        }
    }

    for (let playerBlocksData of playersBlocksData.values()) {
        const playerName = playerBlocksData[0].ownerName
        const playerData: PlayerData | undefined = playersData.get(playerName)

        if (playerData === undefined) {
            throw Error("Player is not defined in the state that is beeing constructed yet.")
        }

        playerData.blocks = playerBlocksData
        playerData.population = getPlayerPopulationFromBlocks(playerBlocksData)
    }

    return playersData
}

export function generateStateFromScene(map: Array<Array<Block>>): State {
    const mapState: Array<Array<BlockData>> = generateMapStateFromMap(map)
    const playersState: Map<string, PlayerData> = generatePlayersStateFromMap(mapState, map)

    const playersNameList: Array<string> = Array.from(playersState.keys())

    setVisibility(mapState, playersNameList)

    return {
        map: mapState,
        players: playersState
    }
}
