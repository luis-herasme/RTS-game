
class Vector {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y)
    }

    static mult(scalar: number, v: Vector): Vector {
        return new Vector(scalar * v.x, scalar * v.y)
    }

    public add(v: Vector): void {
        this.x = this.x + v.x
        this.y = this.y + v.y
    }

    public mult(scalar: number): void {
        this.x = scalar * this.x
        this.y = scalar * this.y
    }

    public zero():void {
        this.x = 0
        this.y = 0
    }
}

export default Vector
