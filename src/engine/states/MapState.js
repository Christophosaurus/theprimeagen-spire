import { GameState } from './GameState.js';
import { renderMap } from '../../ui/render.js';

/**
 * MapState - Handles map navigation
 * Preserves exact existing functionality from root.go() and renderMap()
 */
export class MapState extends GameState {
    constructor() {
        super('MAP');
    }

    async enter(gameRoot, previousState = null) {
        // Clear battle-specific state when entering map
        gameRoot.enemy = null;
        gameRoot._battleInProgress = false;
        
        // Save when entering map (preserves existing behavior)
        gameRoot.save();
        
        // Trigger initial render when entering the state
        await gameRoot.render();
    }

    async render(gameRoot) {
        await renderMap(gameRoot);
    }

    getSaveData(gameRoot) {
        return {
            ...super.getSaveData(gameRoot),
            nodeId: gameRoot.nodeId,
            currentAct: gameRoot.currentAct,
            completedNodes: gameRoot.completedNodes
        };
    }

    restoreFromSave(gameRoot, saveData) {
        if (saveData.nodeId) gameRoot.nodeId = saveData.nodeId;
        if (saveData.currentAct) gameRoot.currentAct = saveData.currentAct;
        if (saveData.completedNodes) gameRoot.completedNodes = saveData.completedNodes;
    }
}
