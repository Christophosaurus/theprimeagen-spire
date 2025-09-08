import { GameState } from './GameState.js';
import { renderRest } from '../../ui/render.js';

/**
 * RestState - Handles rest/upgrade interactions
 * Preserves exact existing functionality from renderRest()
 */
export class RestState extends GameState {
    constructor() {
        super('REST');
    }

    async enter(gameRoot, previousState = null) {
        gameRoot.save();
        await gameRoot.render();
    }

    async render(gameRoot) {
        await renderRest(gameRoot);
    }

    getSaveData(gameRoot) {
        return {
            ...super.getSaveData(gameRoot),
            nodeId: gameRoot.nodeId
        };
    }
}
