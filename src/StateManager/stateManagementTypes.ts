import StateMap from "./StateMap";

export interface PlayerConfiguration {
    name: string
    color: string
    capital: BlockPosition
    bot: boolean
}

export interface GameConfiguration {
    map: Array<Array<string>>
    players: Array<PlayerConfiguration>
}

export enum Visibility {
    hidden,
    visible
}

export interface BlockPosition {
    x: number,
    y: number
}

export interface State {
    map: StateMap
    players: Map<string, PlayerData>
}

export interface BlockData {
    ownerName: string
    previousOwnerName: string
    position: {
        x: number,
        y: number
    }
    population: number
    type: string
    level: number
    ship: boolean
    visibility: Map<string, Visibility>
    canBeConquer: boolean
    dirty: boolean
}

export interface BlockDataValidToAPlayer {
    ownerName: string
    color: string
    position: BlockPosition
    population: number
    type: string
    level: number
    ship: boolean
    visibility: Visibility
    canBeConquer: boolean
}

export interface PlayerData {
    name: string
    alive: boolean
    color: string
    blocks: Array<BlockData>
    canGoOnWater: Boolean
    blockSelected: BlockData | null
    population: number
    capital: BlockPosition
    bot: boolean
}

export interface PlayerDisplayData {
    name: string
    population: number
    color: string
    territories: number
}
