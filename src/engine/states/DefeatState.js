import { GameState } from './GameState.js';
import { renderLose } from '../../ui/render.js';

/**
 * DefeatState - Handles defeat screen
 * Preserves exact existing functionality from renderLose()
 */
export class DefeatState extends GameState {
    constructor() {
        super('DEFEAT');
    }

    async enter(gameRoot, previousState = null) {
        await gameRoot.render();
    }

    async render(gameRoot) {
        await renderLose(gameRoot);
    }

    getSaveData(gameRoot) {
        return {
            ...super.getSaveData(gameRoot),
            nodeId: gameRoot.nodeId
        };
    }
}
