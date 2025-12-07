const USER_PROFILE_KEY = 'aiAvatarUserProfile';

export class UserProfileManager {
    constructor() {
        this.profile = this.loadProfile();
    }

    /**
     * Loads the user profile from localStorage.
     * @returns {object} The user profile object.
     */
    loadProfile() {
        const profileData = localStorage.getItem(USER_PROFILE_KEY);
        return profileData ? JSON.parse(profileData) : {
            onboardingComplete: false,
            averageCalculationTime: null,
        };
    }

    /**
     * Saves the user profile to localStorage.
     */
    saveProfile() {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(this.profile));
    }

    /**
     * Updates the user's profile with their average calculation time and
     * marks the onboarding process as complete.
     * @param {number} averageTime - The user's average time in seconds.
     */
    completeOnboarding(averageTime) {
        this.profile.onboardingComplete = true;
        this.profile.averageCalculationTime = averageTime;
        this.saveProfile();
    }

    /**
     * Checks if the user has completed the onboarding process.
     * @returns {boolean} True if onboarding is complete, false otherwise.
     */
    isOnboardingComplete() {
        return this.profile.onboardingComplete;
    }

    /**
     * Gets the user's average calculation time.
     * @returns {number|null} The average time in seconds, or null if not set.
     */
    getAverageCalculationTime() {
        return this.profile.averageCalculationTime;
    }
}
