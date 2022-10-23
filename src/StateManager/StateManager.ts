import {
    BlockData,
    BlockDataValidToAPlayer,
    BlockPosition,
    PlayerConfiguration,
    PlayerData,
    PlayerDisplayData,
    State,
    Visibility
} from './stateManagementTypes';
import { NONE_PLAYER_DATA } from '../constants/constants';
import AI from '../AI';

class StateManager {
    private state: State;
    private updatePeriod: number = 100;
    private BLOCK_MAX_LEVEL: number = 3;
    private settlementUpdateTime: number = 3000;
    private nonSettlementUpdateTime: number = 5000;
    private ais: AI[] = [];

    constructor(state: State) {
        this.state = state;

        for (const aiData of this.state.players.values()) {
            if (aiData.bot) {
                this.loadAI(aiData);
            }
        }
    }

    public start(): void {
        this.ais.forEach((ai) => ai.start());
        this.updateBlocksPopulation();
        setInterval(() => {
            this.update();
        }, this.updatePeriod);
    }

    public getBlockSelected(playerName: string): BlockPosition | undefined {
        return this.getPlayerData(playerName).blockSelected?.position;
    }

    public getPlayerData(playerName: string): PlayerData {
        const player: PlayerData | undefined = this.state.players.get(playerName);

        if (player == undefined) {
            throw Error('playerName provided is not defined in the state. playerName provided: ' + playerName);
        }

        return player;
    }

    public move(
        newBlockPosition: BlockPosition,
        prevBlockPosition: BlockPosition,
        playerName: string,
        moveHalf: boolean = false
    ): boolean {
        if (!this.state.map.validPosition(newBlockPosition) || !this.state.map.validPosition(prevBlockPosition)) {
            return false;
        }

        const newBlock = this.state.map.getBlockAt(newBlockPosition);
        const prevBlock = this.state.map.getBlockAt(prevBlockPosition);
        const player: PlayerData = this.getPlayerData(playerName);
        if (newBlock == null || prevBlock == null) {
            return false;
        }
        return this.moveHelper(newBlock, prevBlock, player, moveHalf);
    }

    public checkIfAlive(playerName: string): boolean {
        const player = this.state.players.get(playerName);
        if (player === undefined) {
            console.warn('Player requested to check if alive is not defined.');
            return false;
        } else {
            return player.alive;
        }
    }

    // API
    // TODO: Make this work with player ID, a random ID generated in the player browser
    public getBoardState(playerName: string): BlockDataValidToAPlayer[] {
        const data: BlockDataValidToAPlayer[] = [];

        this.state.map.eachBlock((block: BlockData) => {
            if (this.isNextToPlayer(block, playerName) || this.wasNextToPlayer(block, playerName)) {
                if (block.dirty) {
                    const validData = this.getBlockValidDataToPlayer(block, playerName);
                    data.push(validData);
                }
                block.dirty = false;
            }
        });
        return data;
    }

    public setBlockSelectedFromClick(playerName: string, blockPosition: BlockPosition): boolean {
        const block = this.state.map.getBlockAt(blockPosition);

        if (block?.ownerName == playerName) {
            this.setBlockSelected(block, this.getPlayerData(playerName));
            return true;
        }
        return false;
    }

    public getWinner(): string | null {
        let totalPlayersStanding: number = 0;
        let winnerName: string = '';

        for (const player of this.state.players.values()) {
            const population = this.getPlayerPopulation(player);
            if (population > 0) {
                totalPlayersStanding += 1;
                winnerName = player.name;
            }
        }

        if (totalPlayersStanding == 1) {
            return winnerName;
        } else {
            return null;
        }
    }

    public levelUpBlock(blockPosition: BlockPosition): void {
        const block: BlockData | null = this.state.map.getBlockAt(blockPosition);

        if (block == null) {
            console.warn('Block to level up is no defined in the map.');
            return;
        }

        if (this.isSettlement(block)) {
            if (block.level == this.BLOCK_MAX_LEVEL) {
                console.warn('Block cannot level up it is in the max level.');
            } else {
                if (block.population > 10 * block.level + 10) {
                    block.population = block.population - (10 * block.level + 10);
                    block.level = block.level + 1;
                } else {
                    console.log('You need more than: ', 10 * block.level + 10, ' units in this block.');
                }
            }
        }
    }

    public levelUpBlockSelected(playerName: string) {
        const block = this.getBlockSelected(playerName);
        if (block) {
            this.levelUpBlock(block);
        }
    }

    public getLeaderBoard(): PlayerDisplayData[] {
        const playersData: PlayerData[] = Array.from(this.state.players.values());
        const playersDisplayData: PlayerDisplayData[] = playersData.map((player: PlayerData) => {
            return {
                name: player.name,
                territories: player.blocks.length,
                color: player.color,
                population: this.getPlayerPopulation(player)
            };
        });

        const playersDisplayDataWithoutNone: Array<PlayerDisplayData> = playersDisplayData.filter(
            (player: PlayerDisplayData) => player.name !== 'NONE'
        );

        return playersDisplayDataWithoutNone;
    }

    private loadAI(aiData: PlayerConfiguration) {
        const ai = new AI(aiData.name, aiData.color, aiData.capital, this);
        this.ais.push(ai);
    }

    private updateBlocksPopulation() {
        // Increase population of blocks that are not settlements
        setInterval(this.updateNonSettlementBlocksPopulation.bind(this), this.nonSettlementUpdateTime);

        // Increase population of settlements
        setInterval(this.updateSettlementPopulation.bind(this), this.settlementUpdateTime);
    }

    private moveHelper(
        newBlock: BlockData,
        prevBlock: BlockData,
        player: PlayerData,
        moveHalf: boolean = false
    ): boolean {
        let moved = false;

        // If you are the owner of the previous block
        // and, the new block can be conquer
        // or you can go on water and the block is of type water
        // then you can move
        if (
            prevBlock.ownerName == player.name &&
            (newBlock.canBeConquer || (player.canGoOnWater && this.isWater(newBlock)))
        ) {
            let populationToMove = prevBlock.population - 1;

            if (moveHalf) {
                populationToMove = Math.round(prevBlock.population / 2);
            }

            moved = this.moveUnits(newBlock, prevBlock, populationToMove);

            // If you are in a boat and you moved to a block that is on water
            if (prevBlock.ship && player.canGoOnWater && moved) {
                newBlock.ship = true;
                if (prevBlock.type !== 'SHIP') {
                    // Fix: Infinite population bug
                    newBlock.population = newBlock.population + 1; // Reverse the efect of moving units
                }
            }

            // If you were in a boat and moved; remove the boat in previous block
            if (moved && !moveHalf) {
                prevBlock.ship = false;
                if (this.isWater(prevBlock)) {
                    this.clearBlock(prevBlock, player);
                }
            }
        }

        if (moved) {
            if (newBlock.ownerName != player.name) {
                this.conquerBlock(newBlock, player);
            }
            this.setBlockSelected(newBlock, player);
            newBlock.dirty = true;
            prevBlock.dirty = true;
            return true;
        } else {
            return false;
        }
    }

    private isSettlement(block: BlockData): boolean {
        return (
            block.type == 'H' ||
            block.type == 'TOWER_LEVEL_1' ||
            block.type == 'TOWER_LEVEL_2' ||
            block.type == 'TOWER_LEVEL_3'
        );
    }

    private isWater(block: BlockData): boolean {
        return block.type[0] == 'W';
    }

    private isNextToPlayer(block: BlockData, playerName: string): boolean {
        const surrondingBlocks = this.state.map.getSurroundingBlocks(block);

        for (const block of surrondingBlocks) {
            if (block?.ownerName == playerName) {
                return true;
            }
        }
        return false;
    }

    private wasNextToPlayer(block: BlockData, playerName: string): boolean {
        const surrondingBlocks = this.state.map.getSurroundingBlocks(block);

        for (const block of surrondingBlocks) {
            if (block?.previousOwnerName == playerName) {
                return true;
            }
        }
        return false;
    }

    private setBlockVisibility(value: Visibility, block: BlockData, player: PlayerData) {
        const previousState = block.visibility.get(player.name);

        block.visibility.set(player.name, value);

        if (this.isNextToPlayer(block, player.name)) {
            block.visibility.set(player.name, Visibility.visible);
        }

        if (previousState != block.visibility.get(player.name)) {
            block.dirty = true;
        }
    }

    private setSurroundingsVisibility(block: BlockData, visibility: Visibility, player: PlayerData) {
        const surroundingBlocks = this.state.map.getSurroundingBlocks(block);

        for (const block of surroundingBlocks) {
            this.setBlockVisibility(visibility, block, player);
        }
    }

    private removeBlock(block: BlockData, player: PlayerData): void {
        if (player.name != NONE_PLAYER_DATA.name) {
            player.blocks = player.blocks.filter((x) => x !== block);
            block.previousOwnerName = player.name;
            block.ownerName = '';
            this.setSurroundingsVisibility(block, Visibility.hidden, player);
        }
    }

    private conquerBlock(block: BlockData, player: PlayerData): void {
        if (block.ownerName !== player.name) {
            this.removeBlock(block, this.getPlayerData(block.ownerName));
        }

        player.blocks.push(block);
        block.ownerName = player.name;
        this.setSurroundingsVisibility(block, Visibility.visible, player);
    }

    private updateAlive(player: PlayerData) {
        const capital = this.state.map.getBlockAt(player.capital);

        if (capital == null) {
            console.warn('Capital position not valid.');
            return;
        }

        if (capital.ownerName !== player.name) {
            if (player.alive) {
                const newOwner = this.getPlayerData(capital.ownerName);
                this.transferAllBlocksTo(player, newOwner);
                // TODO: ADD some kind of message: alert(`${this.capital.owner.name} KILLED ${this.name}`)
            }
            player.alive = false;
        }
    }

    private transferAllBlocksTo(prevOwner: PlayerData, newOwner: PlayerData) {
        prevOwner.blocks.forEach((block: BlockData) => {
            this.conquerBlock(block, newOwner);
        });
    }

    private setBlockSelected(block: BlockData, player: PlayerData): void {
        player.blockSelected = block;

        if (player.blockSelected.type == 'SHIP' || player.blockSelected.ship == true) {
            player.canGoOnWater = true;
            player.blockSelected.ship = true;
        }

        if (!this.isWater(player.blockSelected) && player.blockSelected.type != 'SHIP') {
            player.canGoOnWater = false;
            player.blockSelected.ship = false;
        }
    }

    private moveUnits(newBlock: BlockData, prevBlock: BlockData, populationToMove: number): boolean {
        // If you are not the owner of the new block
        if (newBlock.ownerName != prevBlock.ownerName) {
            // If your population is too low you cant conquer
            if (prevBlock.population <= 1) return false;

            // If your poplation is greater you can conquer
            if (populationToMove > newBlock.population) {
                newBlock.population = populationToMove - newBlock.population;
                prevBlock.population = prevBlock.population - populationToMove;
                return true;
            }

            // If your population is leasser you can attack
            else {
                newBlock.population = newBlock.population - populationToMove;
                prevBlock.population = prevBlock.population - populationToMove;

                newBlock.dirty = true;
                prevBlock.dirty = true;

                return false;
            }
        }

        // If that block is yours, you move your population
        else {
            newBlock.population = populationToMove + newBlock.population;
            prevBlock.population = prevBlock.population - populationToMove;
            return true;
        }
    }

    private clearBlock(block: BlockData, player: PlayerData): void {
        this.removeBlock(block, player);
        block.population = 0;
        block.ownerName = NONE_PLAYER_DATA.name;
    }

    private updateNonSettlementBlocksPopulation(): void {
        this.state.map.eachBlock((block: BlockData) => {
            if (block.ship && block.type !== 'SHIP') {
                block.population = block.population - 1;
                if (block.population < 1) {
                    this.deleteBoat(block);
                }
                block.dirty = true;
            } else if (block.ownerName !== NONE_PLAYER_DATA.name && !this.isSettlement(block)) {
                block.population = block.population + 1;
                block.dirty = true;
            }
        });
    }

    private updateSettlementPopulation(): void {
        this.state.map.eachBlock((block: BlockData) => {
            if (block.ownerName !== NONE_PLAYER_DATA.name && this.isSettlement(block)) {
                block.population = block.population + (block.level + 1);
                block.dirty = true;
            }
        });
    }

    private deleteBoat(block: BlockData): void {
        const previousOwnerName = block.ownerName;
        const player = this.getPlayerData(previousOwnerName);

        block.ownerName = NONE_PLAYER_DATA.name;
        block.previousOwnerName = previousOwnerName;
        block.ship = false;

        this.setSurroundingsVisibility(block, Visibility.hidden, player);
    }

    private update() {
        for (const player of this.state.players.values()) {
            if (player.name !== 'NONE') {
                this.updateAlive(player);
            }

            if (player.alive && player.blockSelected?.ownerName !== player.name) {
                player.blockSelected = this.state.map.getBlockAt(player.capital);
            }
        }
    }

    private getPlayerPopulation(player: PlayerData): number {
        let totalPopulation: number = 0;
        for (const block of player.blocks) {
            totalPopulation += block.population;
        }
        return totalPopulation;
    }

    private getBlockValidDataToPlayer(block: BlockData, playerName: string): BlockDataValidToAPlayer {
        const visibility = block.visibility.get(playerName);
        const player: PlayerData = this.getPlayerData(block.ownerName);

        if (visibility === undefined) {
            throw Error('Visibility for this player is not defined.');
        }

        if (player.color === undefined) {
            throw Error('Color for this player is not defined.');
        }

        return {
            ownerName: block.ownerName,
            color: player.color,
            position: {
                x: block.position.x,
                y: block.position.y
            },
            population: block.population,
            type: block.type,
            level: block.level,
            ship: block.ship,
            visibility: visibility,
            canBeConquer: block.canBeConquer
        };
    }
}

export default StateManager;
