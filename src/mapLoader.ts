import Vector from './Vector';
import { BLOCK_DEFAULT_SIZE } from './constants/constants';
import Block from './Block';
import Settlement from './Settlement';

export function generateMapMatrix(mapSize: number) {
    const map: Array<Array<null>> = [];
    for (let y = 0; y < mapSize; y++) {
        map[y] = [];
        for (let x = 0; x < mapSize; x++) {
            map[y].push(null);
        }
    }
    return map;
}

export function loadMap(map: Array<Array<string>>): Array<Array<Settlement | Block>> {
    const sceneMap: Array<Array<Settlement | Block>> = [];

    for (let y = 0; y < map.length; y++) {
        sceneMap.push([]);
        for (let x = 0; x < map.length; x++) {
            const size = new Vector(BLOCK_DEFAULT_SIZE, BLOCK_DEFAULT_SIZE);
            const position = new Vector(x * BLOCK_DEFAULT_SIZE, y * BLOCK_DEFAULT_SIZE);
            const block = new Block(position, size, x, y, map[y][x]);

            let addedSettlement: boolean = false;

            if (map[y][x].includes('TOWER_LEVEL_') || map[y][x] == 'H') {
                const settlement = new Settlement(position, size, x, y, map[y][x]);

                if (map[y][x] === 'H') {
                    settlement.population = 5;
                    settlement.level = 0;
                } else if (map[y][x] === 'TOWER_LEVEL_1') {
                    settlement.population = 10;
                    settlement.level = 1;
                } else if (map[y][x] === 'TOWER_LEVEL_2') {
                    settlement.population = 50;
                    settlement.level = 2;
                } else if (map[y][x] === 'TOWER_LEVEL_3') {
                    settlement.population = 100;
                    settlement.level = 3;
                }
                sceneMap[y].push(settlement);
                addedSettlement = true;
            } else {
                if (map[y][x] == 'SHIP') {
                    block.population = 2;
                }
            }

            if (!addedSettlement) {
                sceneMap[y].push(block);
            }
        }
    }
    return sceneMap;
}
