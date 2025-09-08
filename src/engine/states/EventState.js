import { GameState } from './GameState.js';
import { renderEvent } from '../../ui/render.js';

/**
 * EventState - Handles random events
 * Preserves exact existing functionality from renderEvent()
 */
export class EventState extends GameState {
    constructor() {
        super('EVENT');
    }

    async enter(gameRoot, previousState = null) {
        gameRoot.save();
        await gameRoot.render();
    }

    async exit(gameRoot, nextState = null) {
        // Clear event-specific state when leaving
        gameRoot.currentEvent = null;
    }

    async render(gameRoot) {
        renderEvent(gameRoot);
    }

    getSaveData(gameRoot) {
        return {
            ...super.getSaveData(gameRoot),
            nodeId: gameRoot.nodeId,
            currentEvent: gameRoot.currentEvent
        };
    }

    restoreFromSave(gameRoot, saveData) {
        if (saveData.currentEvent) gameRoot.currentEvent = saveData.currentEvent;
    }
}
