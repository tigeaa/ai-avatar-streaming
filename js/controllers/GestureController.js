import * as THREE from 'three';

/**
 * アバターのボーンアニメーションを制御するクラス
 */
export class GestureController {
    /**
     * @param {THREE.Object3D} avatar - Ready Player Meのアバターオブジェクト
     */
    constructor(avatar) {
        this.avatar = avatar;
        this.mixer = new THREE.AnimationMixer(avatar);
        this.actions = {};
        this.currentAction = null;
        
        // アニメーションの速度を調整するためのクロック
        this.clock = new THREE.Clock();

        // ボーン名とボーンオブジェクトのマッピングを作成
        this.bones = {};
        avatar.traverse(object => {
            if (object.isBone) {
                this.bones[object.name] = object;
            }
        });
    }

    /**
     * 指定されたボーンを指定された回転量までアニメーションさせる
     * @param {THREE.Bone} bone - 対象のボーン
     * @param {string} axis - 回転軸 ('x', 'y', 'z')
     * @param {number} startValue - 開始回転量（ラジアン）
     * @param {number} endValue - 終了回転量（ラジアン）
     * @param {number} duration - アニメーション時間（ミリ秒）
     * @returns {Promise<void>}
     */
    animateBone(bone, axis, startValue, endValue, duration) {
        return new Promise(resolve => {
            const startTime = performance.now();
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(1, elapsed / duration);
                const currentValue = startValue + (endValue - startValue) * progress;

                bone.rotation[axis] = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            requestAnimationFrame(animate);
        });
    }

    /**
     * ジェスチャーを実行
     * @param {string} gestureName - 実行するジェスチャー名
     * @returns {Promise<void>}
     */
    async executeGesture(gestureName) {
        // 既存のアクションがあれば停止
        if (this.currentAction) {
            this.currentAction.stop();
            this.currentAction = null;
        }

        switch (gestureName) {
            case 'wave':
                await this.waveGesture();
                break;
            case 'nod':
                await this.nodGesture();
                break;
            // 他のジェスチャーを追加
            default:
                console.warn(`Unknown gesture: ${gestureName}`);
                return;
        }
    }

    /**
     * 手を振るジェスチャー
     */
    async waveGesture() {
        const rightArm = this.bones['RightArm'];
        if (!rightArm) {
            console.error('RightArm bone not found.');
            return;
        }

        // 腕を上げる (Z軸回転)
        await this.animateBone(rightArm, 'z', rightArm.rotation.z, -1.5, 300);

        // 手を振る動作 (X軸回転)
        for (let i = 0; i < 3; i++) {
            await this.animateBone(rightArm, 'x', rightArm.rotation.x, rightArm.rotation.x + 0.3, 200);
            await this.animateBone(rightArm, 'x', rightArm.rotation.x, rightArm.rotation.x - 0.6, 200);
            await this.animateBone(rightArm, 'x', rightArm.rotation.x, rightArm.rotation.x + 0.3, 200);
        }

        // 腕を下ろす
        await this.animateBone(rightArm, 'z', rightArm.rotation.z, 0, 300);
    }

    /**
     * 頷くジェスチャー
     */
    async nodGesture() {
        const head = this.bones['Head'];
        if (!head) {
            console.error('Head bone not found.');
            return;
        }

        // 頷き動作 (X軸回転)
        for (let i = 0; i < 2; i++) {
            // 下に傾ける
            await this.animateBone(head, 'x', head.rotation.x, head.rotation.x + 0.2, 200);
            // 上に戻す
            await this.animateBone(head, 'x', head.rotation.x, head.rotation.x - 0.2, 200);
        }
        // 元の位置に戻す
        await this.animateBone(head, 'x', head.rotation.x, 0, 200);
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
