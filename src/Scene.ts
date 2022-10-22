import Block from './Block';
import { loadMap } from './mapLoader';
import Renderable from './Renderable';
import Settlement from './Settlement';

class Scene {
    public map: Array<Array<Block | Settlement>>;

    constructor(map: Array<Array<string>>) {
        this.map = loadMap(map);
    }

    // Adds a block to the scene in the x, y position
    public addBlock(block: Block, x: number, y: number): void {
        this.map[y][x] = block;
    }

    // Applies a given function to each block in the scene
    public eachBlock(fn: Function) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map.length; x++) {
                const block: Block = this.map[y][x];
                fn(block);
            }
        }
    }

    public getBlockAt(x: number, y: number) {
        return this.map[y][x];
    }

    public render(): void {
        Renderable.clearWindow();
        this.eachBlock((block: Block) => {
            block.render();
        });
    }

    public getBlockIfDefined(x: number, y: number): Block | null {
        if (this.map[y]) {
            if (this.map[y][x] !== undefined) {
                return this.map[y][x];
            }
        }
        return null;
    }
}

export default Scene;
