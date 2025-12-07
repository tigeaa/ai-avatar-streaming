import * as THREE from 'three';
import { GestureController } from './GestureController.js';

export class AvatarController {
    constructor(avatar) {
        this.avatar = avatar;
        this.isTalking = false;
        this.morphTargetMeshes = [];

        // --- Core Animation Setup ---
        // 1. Create a single AnimationMixer for the entire avatar
        this.mixer = new THREE.AnimationMixer(this.avatar);

        // 2. Initialize GestureController and pass the shared mixer to it
        this.gestureController = new GestureController(avatar, this.mixer);

        // Find all meshes with morph targets for lip-syncing
        this.avatar.traverse(node => {
            if (node.isMesh && node.morphTargetInfluences) {
                this.morphTargetMeshes.push(node);
            }
        });
    }

    startTalking() {
        this.isTalking = true;
    }

    stopTalking() {
        this.isTalking = false;
        // Reset mouth to closed position
        this.setExpression('mouthOpen', 0);
    }

    setExpression(expressionName, value) {
        this.morphTargetMeshes.forEach(mesh => {
            const index = mesh.morphTargetDictionary[expressionName];
            if (index !== undefined) {
                mesh.morphTargetInfluences[index] = value;
            }
        });
    }

    update(deltaTime) {
        // --- Main Animation Loop ---
        // 1. Update the AnimationMixer. This will update all animations,
        // including gestures and any future animation clips.
        this.mixer.update(deltaTime);

        // 2. Update lip-sync animation procedurally when talking
        if (this.isTalking) {
            const time = performance.now() * 0.005;
            const mouthOpenValue = (Math.sin(time * 20) + 1) / 2; // Faster oscillation
            // --- Make mouth movement more pronounced by increasing the multiplier ---
            this.setExpression('mouthOpen', mouthOpenValue * 1.2);
        }
    }
}
