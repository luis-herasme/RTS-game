
import { BlockPosition } from './StateManager/stateManagementTypes';
import { v4 as uuid } from 'uuid';
import Renderable from './Renderable';
import Vector from './Vector';
import { BLOCK_DEFAULT_SIZE } from './constants/constants';
import Block from './Block';

class Player extends Renderable {
    public color: string;
    public name: string;
    public alive: boolean = true;
   
    public capital: BlockPosition;
    public id = uuid();
    public canGoOnWater: boolean = false;
    public blockSelected: Block | null = null;

    constructor(name: string, color: string, capital: BlockPosition) {
        super(new Vector(0, 0), new Vector(BLOCK_DEFAULT_SIZE, BLOCK_DEFAULT_SIZE));
        this.name = name;
        this.color = color;
        this.capital = capital;
    }

    // Renders a shadow above the selected block
    public render() {
        if (this.blockSelected !== null) {
            this.positionRelativeToCamera = this.blockSelected.positionRelativeToCamera;
            this.drawTile('SHADOW');
        }
    }
}

export default Player;
