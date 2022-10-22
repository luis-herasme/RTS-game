import ClientStateManager from './StateManager/SinglePlayerStateManager';
import CanvasManager from './CanvasManager';
import EventHandler from './EventManager';
import Camera from './Camera';
import FPS from './FPSManager';
import Player from './Player';
import Scene from './Scene';
import UI from './UI';

class GameManager {
    private scene: Scene;
    private camera: Camera;
    private player: Player;
    private canvasManager: CanvasManager;
    private uiManager: UI;
    private eventManager: EventHandler;
    private fpsManager: FPS;
    private clientStateManager: ClientStateManager;

    constructor(scene: Scene, player: Player, clientStateManager: ClientStateManager) {
        this.scene = scene;
        this.player = player;
        this.canvasManager = new CanvasManager();
        this.fpsManager = new FPS();
        this.camera = new Camera(scene);
        this.clientStateManager = clientStateManager;
        this.uiManager = new UI(this.clientStateManager, this.player.name);
        this.eventManager = new EventHandler(scene, player.cursor, this.camera, player, this.clientStateManager);

        // set camera initial position to player capital position
        const capital = this.scene.getBlockAt(this.player.capital.x, this.player.capital.y);
        this.camera.setCenterAtBlock(capital);
    }

    private winPresented: boolean = false;

    private checkIfWin() {
        const winner: string | null = this.clientStateManager.getWinner();
        if (winner !== null && !this.winPresented) {
            if (winner == this.player.name) {
                alert(`YOU WIN!`);
            } else {
                alert(`You lost, ${winner} won!`);
            }
            this.winPresented = true;
        }
    }

    private checkIfLost() {
        const alive: boolean = this.clientStateManager.checkIfAlive();

        if (!alive && this.player.alive) {
            alert(`You lost!`);
            this.player.alive = false;
        }
    }

    private update() {
        this.checkIfWin();
        this.checkIfLost();
        this.clientStateManager.update();
        this.fpsManager.update();
        this.scene.render();
        this.player.cursor.render();
        this.camera.update();
        requestAnimationFrame(() => this.update());
    }

    public start(): void {
        this.uiManager.start(this.player.cursor);
        requestAnimationFrame(() => this.update());
    }
}

export default GameManager;
