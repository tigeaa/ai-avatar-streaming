import * as THREE from 'three';

/**
 * アバターのアニメーションを制御するクラス
 * 常に両手を振るアニメーションを再生します。
 */
export class GestureController {
    /**
     * @param {THREE.Object3D} avatar - Ready Player Meのアバターオブジェクト
     */
    constructor(avatar) {
        this.avatar = avatar;
        this.mixer = new THREE.AnimationMixer(avatar);
        this.bones = {};

        // Find and store all bones
        avatar.traverse(object => {
            if (object.isBone) {
                this.bones[object.name] = object;
            }
        });

        // Create and play the continuous waving animation
        this.createAndPlayWavingAnimation();
    }

    /**
     * 両手を常に振り続けるAnimationClipを生成し、再生します。
     */
    createAndPlayWavingAnimation() {
        const rightArm = this.bones['RightArm'];
        const leftArm = this.bones['LeftArm'];

        if (!rightArm || !leftArm) {
            console.error('RightArm or LeftArm bone not found. Cannot create waving animation.');
            return;
        }

        const waveDuration = 4; // seconds

        // --- Keyframe Tracks ---
        // 腕を上げる (Z軸回転) & 横に広げる (Y軸回転)
        const rightArmZTrack = new THREE.NumberKeyframeTrack('RightArm.rotation[z]', [0, 1], [0, -1.5]);
        const rightArmYTrack = new THREE.NumberKeyframeTrack('RightArm.rotation[y]', [0, 1], [0, -0.5]);
        const leftArmZTrack = new THREE.NumberKeyframeTrack('LeftArm.rotation[z]', [0, 1], [0, 1.5]);
        const leftArmYTrack = new THREE.NumberKeyframeTrack('LeftArm.rotation[y]', [0, 1], [0, 0.5]);

        // 腕を前後に振る (X軸回転)
        const rightArmXTrack = new THREE.NumberKeyframeTrack('RightArm.rotation[x]', [1, 2, 3, 4], [0, -0.5, 0.5, 0]);
        const leftArmXTrack = new THREE.NumberKeyframeTrack('LeftArm.rotation[x]', [1, 2, 3, 4], [0, -0.5, 0.5, 0]);

        const clip = new THREE.AnimationClip('waving-loop', -1, [
            rightArmZTrack,
            rightArmYTrack,
            leftArmZTrack,
            leftArmYTrack,
            rightArmXTrack,
            leftArmXTrack
        ]);

        const action = this.mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat);
        action.play();
    }

    /**
     * アニメーションミキサーを更新
     * @param {number} delta - 前回の更新からの経過時間
     */
    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }
}
