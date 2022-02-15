import { MAP } from "./constants"
import GameManager from "./GameManager"
import Player from "./Player"

// Creating player
const player = new Player("Luis", "rgba(255, 0, 0, 0.5)")
const gameManager = new GameManager(MAP, player)
gameManager.start()
