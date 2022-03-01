import Block from "./Block"
import Camera from "./Camera"
import { FORCE } from "./constants/constants"
import Cursor from "./Cursor"
import Player from "./Player"
import Renderable from "./Renderable"
import Vector from "./Vector"
import { BlockPosition } from "./StateManager/stateManagementTypes"
import ClientStateManager from "./StateManager/SinglePlayerStateManager"
import Scene from "./Scene"

/**
 * All the game events are handled here, except UI events,
 * those events are handle in UI.ts
 */
class EventManager {
    private cursor: Cursor
    private camera: Camera
    private player: Player
    private scene: Scene
    private cameraDisplacementAfterDrag: number = 0
    private clickDuration: number = 0
    private clientStateManager: ClientStateManager
    private moveHalfOfThePopuation: boolean = false

    constructor(scene: Scene, cursor: Cursor, camera: Camera, player: Player, clientStateManager: ClientStateManager) {
        this.scene = scene
        this.cursor = cursor
        this.player = player
        this.camera = camera
        this.clientStateManager = clientStateManager
        this.start()
    }

    public start(): void {
        this.listenCameraMovementEvents()
        // listenBlockClick must be after listeCameraMovementEvents
        this.listenBlockClick()
        this.listenCursorKeyboardEvents()
    }

    // Camera 
    private listenCameraMovementEvents() {
        let mousedownPosition = new Vector(0, 0)
        let mouseupPosition = new Vector(0, 0)
        let mouseMoveLastPosition = new Vector(0, 0)
        let mouseIsDown = false

        let mouseMovePosition = new Vector(0, 0)

        let mousedownTime: Date
        let mouseupTime: Date

        document.addEventListener("wheel", (e) => {
            const initialScale = Renderable.scale
            let newScale

            const initialPosition = new Vector(
                -this.camera.position.x + mouseMovePosition.x / Renderable.scale,
                -this.camera.position.y + mouseMovePosition.y / Renderable.scale
            )

            if (e.deltaY > 0) {
                newScale = initialScale * 0.9
            } else {
                newScale = initialScale * 1.1
            }

            const finalPosition = new Vector(
                -this.camera.position.x + mouseMovePosition.x / newScale,
                -this.camera.position.y + mouseMovePosition.y / newScale
            )

            let positionDiference = Vector.sub(initialPosition, finalPosition)
            Renderable.scale = newScale
            this.camera.position.sub(positionDiference)
            this.camera.updateBlocksRelativePosition()

        })

        document.addEventListener("mousedown", (e) => {
            mousedownPosition.x = e.clientX
            mousedownPosition.y = e.clientY
            mouseIsDown = true
            mousedownTime = new Date()
            mouseMoveLastPosition = mousedownPosition

            this.cameraDisplacementAfterDrag = 0
        })

        document.addEventListener("mousemove", (e) => {
            mouseMovePosition.x = e.clientX
            mouseMovePosition.y = e.clientY

            if (mouseIsDown) {
                const displacement = Vector.sub(mouseMovePosition, mouseMoveLastPosition)
                this.camera.position = Vector.add(this.camera.position, displacement)
                mouseMoveLastPosition = mouseMovePosition.copy()
                this.cameraDisplacementAfterDrag += Vector.mag(displacement)
            }
        })

        document.addEventListener("mouseup", (e) => {
            mouseupPosition.x = e.clientX
            mouseupPosition.y = e.clientY
            mouseupTime = new Date()

            const milliseconds = (Number(mouseupTime) - Number(mousedownTime))
            this.clickDuration = milliseconds

            if (milliseconds < 200) {
                const direction = Vector.sub(mouseupPosition, mousedownPosition)
                direction.mult(0.15) // Normalization and multiplication
                this.camera.addForce(direction)
            }
            mouseIsDown = false
        })

        document.addEventListener("keydown", (e) => {
            const key = e.key.toLocaleLowerCase()

            if (key === 'w') {
                this.camera.addForce(new Vector(0, FORCE))
            }
            else if (key === 's') {
                this.camera.addForce(new Vector(0, -FORCE))
            }
            else if (key === 'd') {
                this.camera.addForce(new Vector(-FORCE, 0))
            }
            else if (key === 'a') {
                this.camera.addForce(new Vector(FORCE, 0))
            }
        })
    }

    // Block
    private listenBlockClick(): void {
        document.addEventListener("mouseup", (e: MouseEvent) => {
            const mousePosition = new Vector(e.clientX, e.clientY)
            this.scene.eachBlock((block: Block) => {
                if (mousePosition.isInsideBlock(block)) {
                    if ((this.cameraDisplacementAfterDrag < Renderable.scale * 10) && (this.clickDuration > 5)) {
                        if (block.ownerName == this.player.name) {

                            const blockPosition: BlockPosition = {
                                x: block.x,
                                y: block.y
                            }

                            this.clientStateManager.setBlockSelectedFromClick(this.player.name, blockPosition)
                            this.clientStateManager.updateBlockSelected()
                        }
                    }
                }
            })
        })
    }

    private move(newBlock: Block, prevBlock: Block, moveHalf: boolean): boolean {
        const newBlockPosition: BlockPosition = {
            x: newBlock.x,
            y: newBlock.y
        }

        const prevBlockPosition: BlockPosition = {
            x: prevBlock.x,
            y: prevBlock.y
        }

        return this.clientStateManager.move(newBlockPosition, prevBlockPosition, this.player.name, moveHalf)
    }

    private moveIfBlockIsDefined(x: number, y: number): boolean {
        const newBlock = this.scene.getBlockIfDefined(x, y)
        if (newBlock !== null && this.cursor.blockSelected !== null) {
            return this.move(newBlock, this.cursor.blockSelected, this.moveHalfOfThePopuation)
        }
        return false
    }

    // Cusor events 
    private listenCursorKeyboardEvents() {
        document.addEventListener("keydown", (e) => {
            const key = e.key.toLocaleLowerCase()
            this.clientStateManager.updateBlockSelected()
            if (this.cursor.blockSelected !== null) {
                const { x, y } = this.cursor.blockSelected

                let moved: boolean = false

                if (key === 'arrowup') {
                    moved = this.moveIfBlockIsDefined(x, y - 1)
                }
                else if (key === 'arrowdown') {
                    moved = this.moveIfBlockIsDefined(x, y + 1)
                }
                else if (key === 'arrowright') {
                    moved = this.moveIfBlockIsDefined(x + 1, y)
                }
                else if (key === 'arrowleft') {
                    moved = this.moveIfBlockIsDefined(x - 1, y)
                }
                else if (key === ' ') {
                    this.moveHalfOfThePopuation = true
                }

                if (moved) {
                    this.moveHalfOfThePopuation = false
                    this.clientStateManager.updateBlockSelected()
                }
            }
        })
    }
}

export default EventManager
