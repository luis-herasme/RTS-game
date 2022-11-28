import ClientStateManager from './StateManager/SinglePlayerStateManager';
import CanvasManager from './CanvasManager';
import Camera from './Camera';
import FPS from './FPSManager';
import Player from './Player';
import Scene from './Scene';
import UI from './UI';
import { EventBus } from './util/EventBus';
import { ReadMessages, WriteMessages } from './StateManager/messageTypes';
import { signalBus } from './util/SignalBus';
import { mouseEvents, MouseUp } from './MouseEvents';
import Block from './Block';
import Renderable from './Renderable';
import { BlockPosition } from './StateManager/stateManagementTypes';

class GameManager {
    private scene: Scene;
    private camera: Camera;
    private player: Player;
    private canvasManager: CanvasManager;
    private uiManager: UI;
    private fpsManager: FPS;
    private clientStateManager: ClientStateManager;
    private eventBus: EventBus<ReadMessages, WriteMessages> = new EventBus<ReadMessages, WriteMessages>();

    constructor(scene: Scene, player: Player, clientStateManager: ClientStateManager) {
        this.scene = scene;
        this.player = player;
        this.canvasManager = new CanvasManager();
        this.fpsManager = new FPS();
        this.camera = new Camera(scene);
        this.clientStateManager = clientStateManager;
        this.uiManager = new UI(this.clientStateManager, this.player.name);
        // set camera initial position to player capital position
        const capital = this.scene.getBlockAt(this.player.capital.x, this.player.capital.y);
        this.camera.setCenterAtBlock(capital);
        this.listenGameEvents();
    }

    private listenGameEvents() {
        this.eventBus.read('winner', ({ winnerId }) => {
            this.showWinner(winnerId);
        });

        this.eventBus.read('kill', ({ to, from }) => {
            if (to.id === this.player.id) {
                alert(`You lost!`);
                this.player.alive = false;
            } else {
                alert(`${from.name} killed ${to.name}!`);
            }
        });

        signalBus.on(MouseUp, ({ clickDuration, displacementFromDrag }) => {
            const mouseUpPosition = mouseEvents.getMouseUpPosition();

            this.scene.eachBlock((block: Block) => {
                if (mouseUpPosition.isInsideBlock(block)) {
                    if (displacementFromDrag < Renderable.scale * 10 && clickDuration > 5) {
                        if (block.ownerName == this.player.name) {
                            const blockPosition: BlockPosition = {
                                x: block.x,
                                y: block.y
                            };

                            this.clientStateManager.setBlockSelectedFromClick(this.player.name, blockPosition);
                        }
                    }
                }
            });
        });

        this.listenToMovementEvents();
    }

    private moveHalfOfThePopuation: boolean = false;

    private move(newBlock: Block, prevBlock: Block, moveHalf: boolean): boolean {
        const newBlockPosition: BlockPosition = {
            x: newBlock.x,
            y: newBlock.y
        };

        const prevBlockPosition: BlockPosition = {
            x: prevBlock.x,
            y: prevBlock.y
        };

        return this.clientStateManager.move(newBlockPosition, prevBlockPosition, this.player.name, moveHalf);
    }

    private moveIfBlockIsDefined(x: number, y: number): boolean {
        const newBlock = this.scene.getBlockIfDefined(x, y);
        if (newBlock !== null && this.player.blockSelected !== null) {
            return this.move(newBlock, this.player.blockSelected, this.moveHalfOfThePopuation);
        }
        return false;
    }

    private listenToMovementEvents() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLocaleLowerCase();
            if (this.player.blockSelected !== null) {
                const { x, y } = this.player.blockSelected;

                let moved: boolean = false;

                if (key === 'arrowup') {
                    moved = this.moveIfBlockIsDefined(x, y - 1);
                } else if (key === 'arrowdown') {
                    moved = this.moveIfBlockIsDefined(x, y + 1);
                } else if (key === 'arrowright') {
                    moved = this.moveIfBlockIsDefined(x + 1, y);
                } else if (key === 'arrowleft') {
                    moved = this.moveIfBlockIsDefined(x - 1, y);
                } else if (key === ' ') {
                    this.moveHalfOfThePopuation = true;
                }

                if (moved) {
                    this.moveHalfOfThePopuation = false;
                }
            }
        });
    }

    private showWinner(winner: string) {
        if (winner == this.player.name) {
            alert(`YOU WIN!`);
        } else {
            alert(`You lost, ${winner} won!`);
        }
    }

    private update() {
        this.clientStateManager.update();
        this.fpsManager.update();
        this.scene.render();
        this.player.render();
        this.camera.update();
        requestAnimationFrame(() => this.update());
    }

    public start(): void {
        this.uiManager.start(this.player.blockSelected);
        requestAnimationFrame(() => this.update());
    }
}

export default GameManager;
