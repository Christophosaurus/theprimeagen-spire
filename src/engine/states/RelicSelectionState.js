import { GameState } from './GameState.js';
import { renderRelicSelection } from '../../ui/render.js';

/**
 * RelicSelectionState - Handles starting relic choice
 * Preserves exact existing functionality from renderRelicSelection()
 */
export class RelicSelectionState extends GameState {
    constructor() {
        super('RELIC_SELECTION');
    }

    async enter(gameRoot, previousState = null) {
        // Trigger initial render when entering the state
        await gameRoot.render();
    }

    async render(gameRoot) {
        renderRelicSelection(gameRoot);
    }

    getSaveData(gameRoot) {
        return {
            ...super.getSaveData(gameRoot)
        };
    }
}
