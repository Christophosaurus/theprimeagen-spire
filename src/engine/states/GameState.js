/**
 * Base GameState class for the State pattern
 * All game states inherit from this base class
 */
export class GameState {
    constructor(name) {
        this.name = name;
    }

    /**
     * Called when entering this state
     * @param {Object} gameRoot - The game root object
     * @param {Object} previousState - The previous state (optional)
     */
    async enter(gameRoot, previousState = null) {
        // Override in subclasses
    }

    /**
     * Called when exiting this state
     * @param {Object} gameRoot - The game root object
     * @param {Object} nextState - The next state (optional)
     */
    async exit(gameRoot, nextState = null) {
        // Override in subclasses
    }

    /**
     * Handle state-specific rendering
     * @param {Object} gameRoot - The game root object
     */
    async render(gameRoot) {
        // Override in subclasses
        throw new Error(`render() not implemented for state: ${this.name}`);
    }

    /**
     * Get state-specific data for saving
     * @param {Object} gameRoot - The game root object
     */
    getSaveData(gameRoot) {
        return {
            stateName: this.name
        };
    }

    /**
     * Restore state-specific data from save
     * @param {Object} gameRoot - The game root object
     * @param {Object} saveData - The saved data
     */
    restoreFromSave(gameRoot, saveData) {
        // Override in subclasses if needed
    }
}
