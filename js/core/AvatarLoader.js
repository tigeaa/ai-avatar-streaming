import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadAvatar(scene) {
    const loader = new GLTFLoader();
    // Try multiple avatar URLs for redundancy
    const avatarUrls = [
        'https://models.readyplayer.me/6911776237697c47c8fb2cee.glb?morphTargets=ARKit',
        'https://models.readyplayer.me/6911776237697c47c8fb2cee.glb'
    ];

    return new Promise((resolve, reject) => {
        let currentUrlIndex = 0;

        const attemptLoad = () => {
            if (currentUrlIndex >= avatarUrls.length) {
                reject(new Error('Failed to load avatar from all available URLs'));
                return;
            }

            const avatarUrl = avatarUrls[currentUrlIndex];
            console.log(`Attempting to load avatar from: ${avatarUrl}`);

            loader.load(
                avatarUrl,
                (gltf) => {
                    const avatar = gltf.scene;
                    avatar.position.y = -0.9; // Adjust position to stand on the "ground"
                    scene.add(avatar);
                    console.log('Avatar loaded successfully');
                    resolve(avatar);
                },
                (progressEvent) => {
                    if (progressEvent.lengthComputable) {
                        const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
                        console.log(`Avatar loading: ${percentComplete.toFixed(2)}%`);
                    }
                },
                (error) => {
                    console.warn(`Failed to load avatar from URL ${currentUrlIndex}: ${error.message}`);
                    currentUrlIndex++;
                    attemptLoad();
                }
            );
        };

        attemptLoad();
    });
}
