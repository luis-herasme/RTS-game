import { BlockData, Visibility } from './stateManagementTypes';

// ! This is just for initial scene, capital position is needed

function blockDefined({ position: { x, y } }: BlockData, map: Array<Array<BlockData>>) {
    if (map[y]) {
        if (map[y][x]) {
            return true;
        }
    }
    return false;
}

function setBlockSurroundingVisibility(block: BlockData, map: Array<Array<BlockData>>): void {
    if (blockDefined(map[block.position.y][block.position.x], map))
        map[block.position.y][block.position.x].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y][block.position.x + 1])
        map[block.position.y][block.position.x + 1].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y][block.position.x - 1])
        map[block.position.y][block.position.x - 1].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y + 1][block.position.x])
        map[block.position.y + 1][block.position.x].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y - 1][block.position.x])
        map[block.position.y - 1][block.position.x].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y + 1][block.position.x + 1])
        map[block.position.y + 1][block.position.x + 1].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y + 1][block.position.x - 1])
        map[block.position.y + 1][block.position.x - 1].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y - 1][block.position.x + 1])
        map[block.position.y - 1][block.position.x + 1].visibility.set(block.ownerName, Visibility.visible);
    if (map[block.position.y - 1][block.position.x + 1])
        map[block.position.y - 1][block.position.x - 1].visibility.set(block.ownerName, Visibility.visible);
}

export function setVisibility(map: Array<Array<BlockData>>, playersNameList: Array<string>): void {
    // Setting all for all players to hidden
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const block = map[y][x];
            for (let playerName of playersNameList) {
                block.visibility.set(playerName, Visibility.hidden);
            }
        }
    }

    // Setting to visible blocks around a player
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const block = map[y][x];
            if (block.ownerName !== 'NONE') {
                setBlockSurroundingVisibility(block, map);
            }
        }
    }
}
