import Vector from "./Vector"


// Loading sprites
const tilemapSource = require("../public/tilemap-separated.png")

export const TILEMAP = new Image()
TILEMAP.src = tilemapSource


export const BLOCK_LINE_WIDTH = 2
export const FORCE = 20
export const BLOCK_DEFAULT_SIZE = 100
export const TILE_SIZE = 16
export const SPRITE_NAME_TO_SPRITE_POSITION_IN_TILE_MAP = {
    "W": new Vector(6, 4),
    "WBL": new Vector(0, 4),
    "WBR": new Vector(4, 4),
    "WB": new Vector(2, 4),
    "WL": new Vector(0, 2),
    "WR": new Vector(4, 2),
    "H": new Vector(19, 9),
    "H_L2": new Vector(18, 9),
    "T": new Vector(2, 2),
    "WT": new Vector(2, 0),
    "WTL": new Vector(0, 0),
    "WTR": new Vector(4, 0),
    "TREES": new Vector(10, 0),
    "TREES_L2": new Vector(10, 2),
    "TOWER_LEVEL_1": new Vector(13, 9),
    "TOWER_LEVEL_1_L2": new Vector(12, 9),
    "TOWER_LEVEL_2": new Vector(13, 11),
    "TOWER_LEVEL_2_L2": new Vector(12, 11),
    "TOWER_LEVEL_3": new Vector(13, 13),
    "TOWER_LEVEL_3_L2": new Vector(12, 13),
    "MOUNTAIN": new Vector(12, 0),
    "SHIP":  new Vector(2, 4),
    "SHIP_L2":new Vector(15 , 11),

    "BOAT_UP": new Vector(6, 4),
    "BOAT_DOWN": new Vector(6, 4),
    "BOAT_LEFT": new Vector(6, 4),
    "BOAT_RIGHT": new Vector(6, 4),

    "BOAT_UP_L2": new Vector(14, 7),
    "BOAT_DOWN_L2": new Vector(18, 7),
    "BOAT_LEFT_L2": new Vector(12, 7),
    "BOAT_RIGHT_L2": new Vector(16, 7),
    "SHADOW": new Vector(0, 5)
}
export enum Visibility {
    hidden,
    visible
}

// Map definition
export const MAP = [
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", "WTL", "WT", "WT", "WT", "WT", "WT", "WT", "WT", "WTR", "W", "W", "W", "WTL", "WT", "WT", "WT", "WT", "WT", "WT", "WT", "WTR", "W", "W"],
    ["W", "WL", "T", "MOUNTAIN", "T", "T", "T", "T", "TOWER_LEVEL_3", "WR", "W", "W", "W", "WL", "T", "MOUNTAIN", "T", "T", "T", "T", "TOWER_LEVEL_3", "WR", "W", "W"],
    ["W", "WL", "T", "T", "H", "TREES", "TREES", "T", "T","WR", "W", "W", "W", "WL", "T", "T", "H", "TREES", "TREES", "T", "T","WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "TREES", "T", "T", "T", "WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "TREES", "T", "T", "T", "WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "T", "T","WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "T", "T","WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "MOUNTAIN", "MOUNTAIN","WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "MOUNTAIN", "MOUNTAIN","WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "MOUNTAIN", "T", "T","WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "MOUNTAIN", "T", "T","WR", "W", "W"],
    ["W", "WBL", "WB", "SHIP", "WB", "WB", "WB", "WB", "WB", "WBR", "W", "W", "W", "WBL", "WB", "SHIP", "WB", "WB", "WB", "WB", "WB", "WBR", "W", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", "WTL", "WT", "WT", "WT", "WT", "WT", "WT", "WT", "WTR", "W", "W", "W", "WTL", "WT", "WT", "WT", "WT", "WT", "WT", "WT", "WTR", "W", "W"],
    ["W", "WL", "T", "MOUNTAIN", "T", "T", "T", "T", "TOWER_LEVEL_3", "WR", "W", "W", "W", "WL", "T", "MOUNTAIN", "T", "T", "T", "T", "TOWER_LEVEL_3", "WR", "W", "W"],
    ["W", "WL", "T", "T", "H", "TREES", "TREES", "T", "T","WR", "W", "W", "W", "WL", "T", "T", "H", "TREES", "TREES", "T", "T","WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "TREES", "T", "T", "T", "WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "TREES", "T", "T", "T", "WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "T", "T","WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "T", "T","WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "MOUNTAIN", "MOUNTAIN","WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "T", "MOUNTAIN", "MOUNTAIN","WR", "W", "W"],
    ["W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "MOUNTAIN", "T", "T","WR", "W", "W", "W", "WL", "TOWER_LEVEL_1", "T", "T", "T", "MOUNTAIN", "T", "T","WR", "W", "W"],
    ["W", "WBL", "WB", "SHIP", "WB", "WB", "WB", "WB", "WB", "WBR", "W", "W", "W", "WBL", "WB", "SHIP", "WB", "WB", "WB", "WB", "WB", "WBR", "W", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],   
]