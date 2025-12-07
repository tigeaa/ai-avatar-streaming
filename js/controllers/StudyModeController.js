const StudyState = {
    IDLE: 'IDLE',
    STUDYING: 'STUDYING',
    INTERVENING: 'INTERVENING', // When AI is talking or waiting for response
};

export class StudyModeController {
    constructor(userProfileManager) {
        this.state = StudyState.IDLE;
        this.timerId = null;
        this.onInterventionRequired = null; // Callback for when the timer fires
        this.userProfileManager = userProfileManager;
    }

    /**
     * Starts a new study session with a dynamically set timer.
     * @param {number} manualDuration - The manually set timer duration in seconds.
     * @param {string} problemText - The text of the problem the user is working on.
     */
    startStudySession(manualDuration, problemText) {
        if (this.state !== StudyState.IDLE) {
            console.warn('Cannot start a new session while already in one.');
            return;
        }

        let sessionDuration = manualDuration;
        const averageTime = this.userProfileManager.getAverageCalculationTime();

        if (averageTime && averageTime > 0) {
            sessionDuration = Math.round(averageTime * 2.0); // 200% of the user's average
            console.log(`Personalized timer set to ${sessionDuration} seconds (based on user average of ${averageTime.toFixed(2)}s).`);
        } else {
            console.log(`Falling back to manual timer of ${sessionDuration} seconds.`);
        }

        this.state = StudyState.STUDYING;
        this.clearTimer(); // Clear any existing timer just in case

        this.timerId = setTimeout(() => {
            if (this.state === StudyState.STUDYING) {
                console.log('Timer fired. Intervention required.');
                this.state = StudyState.INTERVENING;
                if (this.onInterventionRequired) {
                    this.onInterventionRequired(problemText, sessionDuration);
                }
            }
        }, sessionDuration * 1000);
    }

    /**
     * Completes the current study session and stops the timer.
     */
    completeStudySession() {
        if (this.state === StudyState.IDLE) return;

        console.log('Study session completed by user.');
        this.clearTimer();
        this.state = StudyState.IDLE;
    }

    /**
     * Resets the application to its initial idle state.
     * Can be called after an intervention is handled.
     */
    resetToIdle() {
        this.clearTimer();
        this.state = StudyState.IDLE;
        console.log('State reset to IDLE.');
    }

    /**
     * Safely clears the timeout.
     */
    clearTimer() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }

    /**
     * Sets the callback function for when the timer fires.
     * @param {function} callback - The function to call.
     */
    setOnInterventionRequired(callback) {
        this.onInterventionRequired = callback;
    }

    getState() {
        return this.state;
    }
}
