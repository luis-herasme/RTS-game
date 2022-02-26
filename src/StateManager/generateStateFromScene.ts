import Block from "../Block"
import { BlockData, BlockPosition, PlayerData, State, Visibility } from "./stateManagementTypes"

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
        population: 0 // Changes after
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

function generatePlayersStateFromMap(map: Array<Array<Block>>): Map<string, PlayerData> {

    const playersBlocksData = new Map<string, Array<BlockData>>()
    const playersData = new Map<string, PlayerData>()

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const block = map[y][x]

            if (!playersData.get(block.owner.name)) {
                playersData.set(block.owner.name, getPlayerDataFromBlock(block))
            }

            if (!playersBlocksData.get(block.owner.name)) {
                playersBlocksData.set(block.owner.name, [])
            }

            const player: Array<BlockData> | undefined = playersBlocksData.get(block.owner.name)
            if (player === undefined) {
                throw Error("Player block data is not defined for this player, (An empty array is needed).")
            }
            player.push(getBlockData(block))
        }
    }

    for (let playerBlocksData of Object.values(playersBlocksData)) {
        const playerName = playerBlocksData[0].name
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
    const playersState: Map<string, PlayerData> = generatePlayersStateFromMap(map)

    const playersNameList: Array<string> = Array.from(playersState.keys())

    setVisibility(mapState, playersNameList)

    return {
        map: mapState,
        players: playersState
    }
}
