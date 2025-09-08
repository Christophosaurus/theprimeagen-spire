import { GameState } from './GameState.js';
import { renderWin } from '../../ui/render.js';

/**
 * VictoryState - Handles victory screen
 * Preserves exact existing functionality from renderWin()
 */
export class VictoryState extends GameState {
    constructor() {
        super('VICTORY');
    }

    async enter(gameRoot, previousState = null) {
        await gameRoot.render();
    }

    async render(gameRoot) {
        await renderWin(gameRoot);
    }

    getSaveData(gameRoot) {
        return {
            ...super.getSaveData(gameRoot),
            nodeId: gameRoot.nodeId
        };
    }
}
