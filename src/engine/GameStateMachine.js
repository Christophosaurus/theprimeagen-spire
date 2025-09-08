/**
 * GameStateMachine - Centralized state management
 * Manages all game states and transitions without adding new functionality
 */
export class GameStateMachine {
    constructor(gameRoot) {
        this.gameRoot = gameRoot;
        this.currentState = null;
        this.states = new Map();
        this.stateHistory = []; // For debugging
    }

    /**
     * Register a state with the state machine
     * @param {string} name - State name
     * @param {GameState} state - State instance
     */
    registerState(name, state) {
        this.states.set(name, state);
    }

    /**
     * Get the current state
     * @returns {GameState|null}
     */
    getCurrentState() {
        return this.currentState;
    }

    /**
     * Get current state name
     * @returns {string|null}
     */
    getCurrentStateName() {
        return this.currentState?.name || null;
    }

    /**
     * Transition to a new state
     * @param {string} stateName - Name of the state to transition to
     * @param {Object} transitionData - Optional data for the transition
     */
    async setState(stateName, transitionData = {}) {
        const newState = this.states.get(stateName);
        if (!newState) {
            console.error(`State '${stateName}' not found`);
            return false;
        }

        const previousState = this.currentState;
        
        // Exit current state
        if (previousState) {
            await previousState.exit(this.gameRoot, newState);
        }

        // Update current state
        this.currentState = newState;
        
        // Add to history for debugging
        this.stateHistory.push({
            from: previousState?.name || 'none',
            to: stateName,
            timestamp: Date.now(),
            data: transitionData
        });

        // Keep history reasonable size
        if (this.stateHistory.length > 50) {
            this.stateHistory.shift();
        }

        // Enter new state
        await newState.enter(this.gameRoot, previousState);

        return true;
    }

    /**
     * Render the current state
     */
    async render() {
        if (this.currentState) {
            await this.currentState.render(this.gameRoot);
        }
    }

    /**
     * Get state data for saving
     */
    getSaveData() {
        const data = {
            currentStateName: this.getCurrentStateName(),
            stateHistory: this.stateHistory.slice(-10) // Save last 10 for debugging
        };

        // Get state-specific save data
        if (this.currentState) {
            data.stateData = this.currentState.getSaveData(this.gameRoot);
        }

        return data;
    }

    /**
     * Restore state from save data
     * @param {Object} saveData - The saved state data
     */
    async restoreFromSave(saveData) {
        if (!saveData.currentStateName) {
            console.warn('No state name in save data');
            return false;
        }

        const success = await this.setState(saveData.currentStateName);
        if (success && this.currentState && saveData.stateData) {
            this.currentState.restoreFromSave(this.gameRoot, saveData.stateData);
        }

        // Restore history if available
        if (saveData.stateHistory) {
            this.stateHistory = saveData.stateHistory;
        }

        return success;
    }

    /**
     * Get state transition history (for debugging)
     */
    getHistory() {
        return this.stateHistory.slice();
    }
}
