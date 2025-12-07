import * as THREE from 'three';
import { GestureController } from './GestureController.js';

export class AvatarController {
    constructor(avatar) {
        this.avatar = avatar;
        this.isTalking = false;
        this.morphTargetMeshes = [];
        this.gestureController = new GestureController(avatar);

        // Find all meshes with morph targets
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
        // Update gesture animations
        this.gestureController.update(deltaTime);

        // Update lip-sync animation procedurally
        if (this.isTalking) {
            const time = performance.now() * 0.005;
            const mouthOpenValue = (Math.sin(time * 20) + 1) / 2; // Faster oscillation
            this.setExpression('mouthOpen', mouthOpenValue * 0.7);
        }
    }
}
