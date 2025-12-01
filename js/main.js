import { setupScene } from './core/ThreeSetup.js';
import { loadAvatar } from './core/AvatarLoader.js';
import { SpeechController } from './controllers/SpeechController.js';
import { AvatarController } from './controllers/AvatarController.js';

async function main() {
    console.log("Application starting...");
    const { scene, camera, renderer, animate, updatables } = setupScene();

    // Instantiate controllers
    const speechController = new SpeechController();
    let avatarController;

    // Load the avatar
    try {
        const avatar = await loadAvatar(scene);
        avatarController = new AvatarController(avatar);
        updatables.push(avatarController); // Add avatar controller to the update loop
    } catch (error) {
        console.error("Failed to load avatar, stopping application.", error);
        return;
    }

    // Setup UI event listeners
    const speakButton = document.getElementById('speak-button');
    const textInput = document.getElementById('text-input');

    speakButton.addEventListener('click', () => {
        const text = textInput.value;
        if (text && avatarController) {
            speechController.speak(
                text,
                () => avatarController.startTalking(), // onStart callback
                () => avatarController.stopTalking()   // onEnd callback
            ).catch(e => console.error("Speech failed:", e));
        }
    });

    // Start the animation loop
    animate();

    console.log("Three.js scene setup complete and avatar loaded.");
}

main();
