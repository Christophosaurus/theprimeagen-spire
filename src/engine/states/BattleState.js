import { GameState } from './GameState.js';
import { renderBattle } from '../../ui/render.js';
import { createBattle } from '../battle.js';

/**
 * BattleState - Handles combat
 * Preserves exact existing functionality from createBattle() and renderBattle()
 */
export class BattleState extends GameState {
    constructor() {
        super('BATTLE');
    }

    async enter(gameRoot, previousState = null) {
        // Set battle flag (preserves existing behavior)
        gameRoot._battleInProgress = true;
        
        // If we don't have an enemy yet, we need to create the battle
        // This happens when transitioning from map to battle
        if (!gameRoot.enemy) {
            const node = gameRoot.map.nodes.find(n => n.id === gameRoot.nodeId);
            if (node && node.enemy) {
                createBattle(gameRoot, node.enemy);
            }
        }
    }

    async exit(gameRoot, nextState = null) {
        // Clear battle flag when leaving battle
        gameRoot._battleInProgress = false;
    }

    async render(gameRoot) {
        await renderBattle(gameRoot);
    }

    getSaveData(gameRoot) {
        return {
            ...super.getSaveData(gameRoot),
            nodeId: gameRoot.nodeId,
            battleInProgress: gameRoot._battleInProgress,
            enemy: gameRoot.enemy,
            flags: gameRoot.flags,
            lastCard: gameRoot.lastCard
        };
    }

    restoreFromSave(gameRoot, saveData) {
        if (saveData.battleInProgress !== undefined) {
            gameRoot._battleInProgress = saveData.battleInProgress;
        }
        if (saveData.enemy) gameRoot.enemy = saveData.enemy;
        if (saveData.flags) gameRoot.flags = saveData.flags;
        if (saveData.lastCard) gameRoot.lastCard = saveData.lastCard;
    }
}
