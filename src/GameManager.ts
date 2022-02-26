import ClientStateManager from "./StateManager/ClientStateManager"
import StateManager from "./StateManager/SM/StateManager"
import CanvasManager from "./CanvasManager"
import EventHandler from "./EventManager"
import Renderable from "./Renderable"
import Camera from "./Camera"
import FPS from "./FPSManager"
import Player from "./Player"
import Scene from "./Scene"
import UI from "./UI"

class GameManager {
    private scene: Scene
    private camera: Camera
    private player: Player
    private canvasManager: CanvasManager
    private uiManager: UI
    private eventManager: EventHandler
    private fpsManager: FPS
    private clientStateManager: ClientStateManager

    constructor(scene: Scene, player: Player, stateManager: StateManager) {
        this.scene = scene
        this.player = player
        this.canvasManager = new CanvasManager()
        this.fpsManager = new FPS()
        this.uiManager = new UI()
        this.camera = new Camera(scene)
        this.clientStateManager = new ClientStateManager(player, scene, stateManager)
        this.eventManager = new EventHandler(scene.map, player.cursor, this.camera, player, this.clientStateManager)

        // set camera initial position to player capital position
        const capital = this.scene.getBlockAt(this.player.capital.x, this.player.capital.y)
        this.camera.setCenterAtBlock(capital)
    }

    private update() {
        this.clientStateManager.updateBlocks()
        this.fpsManager.update()
        this.scene.render()
        this.player.cursor.render()
        this.camera.update()
        requestAnimationFrame(() => this.update())
    }

    public start(): void {
        this.uiManager.start(this.scene, this.player.cursor)
        requestAnimationFrame(() => this.update())
    }
}

export default GameManager
