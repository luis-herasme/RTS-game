import Block from "./Block"
import Vector from "./Vector"

class Settlement extends Block { 

    private _level: number

    constructor(position: Vector, size: Vector, x: number, y: number, type: string)  {
        super(position, size, x, y, type)
        this._level = 0
    }

    public get level(): number {
        return this._level
    }

    public set level(value: number) {
        const prev_level = this._level
        this._level = value

        if (value == 0) {
            this.type = "H"
        }
        else if (value == 1) {
            this.type = "TOWER_LEVEL_1"
        } 
        else if (value == 2) {
            this.type = "TOWER_LEVEL_2"
        }
        else if (value == 3) {
            this.type = "TOWER_LEVEL_3"
        }
        else {
            console.error(`Level ${value} is not supported.`)
            this._level = prev_level
        }
    }
    
}

export default Settlement
