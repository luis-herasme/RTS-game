import Cursor from "./Cursor"
import { BlockPosition } from "./StateManager/stateManagementTypes"

class Player {
    public color: string
    public name: string
    public alive: boolean = true
    public cursor: Cursor
    public capital: BlockPosition

    constructor(name: string, color: string, capital: BlockPosition) {
        this.name = name
        this.color = color
        this.capital = capital
        this.cursor = new Cursor()
    }
}

export default Player