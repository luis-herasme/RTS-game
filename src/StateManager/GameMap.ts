import { BlockData, BlockPosition } from './stateManagementTypes';

class GameMap {
    private map: Array<Array<BlockData>>;

    constructor(map: Array<Array<BlockData>>) {
        this.map = map;
    }

    // Applies a given function to each block
    public eachBlock(fn: Function) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                fn(this.map[y][x]);
            }
        }
    }

    public getBlockAt(position: BlockPosition): BlockData | null {
        if (this.validPosition(position)) {
            return this.map[position.y][position.x];
        }
        return null;
    }

    public validPosition({ x, y }: BlockPosition) {
        return x < this.map.length && x >= 0 && y < this.map.length && y >= 0;
    }

    public getSurroundingBlocks(block: BlockData): Array<BlockData> {
        const { x, y } = block.position;

        const surroundingBlocksNotFiltered = [
            this.getBlockAt({ x: x, y }),
            this.getBlockAt({ x: x + 1, y }),
            this.getBlockAt({ x: x - 1, y }),
            this.getBlockAt({ x: x, y: y + 1 }),
            this.getBlockAt({ x: x, y: y - 1 }),
            this.getBlockAt({ x: x + 1, y: y + 1 }),
            this.getBlockAt({ x: x + 1, y: y - 1 }),
            this.getBlockAt({ x: x - 1, y: y + 1 }),
            this.getBlockAt({ x: x - 1, y: y - 1 })
        ];

        return this.removeNullFromBlockList(surroundingBlocksNotFiltered);
    }

    private removeNullFromBlockList(blocksNotFiltered: Array<BlockData | null>): Array<BlockData> {
        const blocksFiltered = [];
        for (let block of blocksNotFiltered) {
            if (block !== null) {
                blocksFiltered.push(block);
            }
        }
        return blocksFiltered;
    }
}

export default GameMap;
