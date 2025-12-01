# AI Avatar Streaming System - デザイン実装ガイド

## デザイン哲学: モダンクリエイティブスタジオ

**Design Movement**: Bauhaus × Digital Minimalism

### 1. グローバルスタイル

#### 背景グラデーション
```css
background: linear-gradient(135deg, #0f0a1f 0%, #1a1a3e 100%);
```

#### カラーパレット
| 要素 | 色コード | 用途 |
|------|---------|------|
| 背景 | #0f0a1f - #1a1a3e | グラデーション背景 |
| アクセント1 | #00d9ff | シアン（ボタンホバー、フォーカス） |
| アクセント2 | #ff006e | マゼンタ（ハイライト） |
| テキスト主 | #ffffff | メインテキスト |
| テキスト副 | #e0e0e0 | サブテキスト |
| ボーダー | #2a2a5e | 分割線 |

### 2. レイアウト構造

```
┌─────────────────────────────────────────────────┐
│  Header: ロゴ + タイトル + ステータス表示        │
├──────────────────────┬──────────────────────────┤
│                      │                          │
│  3D Canvas Area      │  Control Panel           │
│  (70%)               │  (30%)                   │
│                      │  - ガラスモーフィズム    │
│                      │  - 半透明背景            │
│                      │  - ネオンボーダー        │
│                      │                          │
├──────────────────────┴──────────────────────────┤
│  Footer: ステータスバー（FPS、メモリ、ログ）    │
└─────────────────────────────────────────────────┘
```

### 3. コンポーネント仕様

#### Header
- ロゴ: 左側に配置
- タイトル: 「AI Avatar Streaming Studio」
- ステータス表示: 右側にリアルタイム情報

#### 3D Canvas Area
- 背景: 透明（Three.jsレンダリング）
- ボーダー: 1px solid #2a2a5e
- 角丸: border-radius: 8px

#### Control Panel
- 背景: rgba(26, 26, 62, 0.7) + backdrop-filter: blur(10px)
- ボーダー: 1px solid #00d9ff
- 角丸: border-radius: 12px
- パディング: 24px
- ボックスシャドウ: 0 0 20px rgba(0, 217, 255, 0.1)

#### ボタン
- デフォルト: bg-transparent, border-1px-#00d9ff
- ホバー: bg-#00d9ff, text-#0f0a1f, box-shadow: 0 0 15px rgba(0, 217, 255, 0.5)
- アクティブ: bg-#ff006e, box-shadow: 0 0 20px rgba(255, 0, 110, 0.6)

#### スライダー
- トラック: #2a2a5e
- サム: #00d9ff
- ホバー時: グロー効果

### 4. タイポグラフィ

#### フォント設定
```css
/* Display */
font-family: 'Poppins', sans-serif;
font-weight: 700;
font-size: 2.5rem;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;
font-size: 1rem;

/* Mono */
font-family: 'JetBrains Mono', monospace;
font-weight: 400;
font-size: 0.875rem;
```

#### 階層
- h1: 2.5rem, Poppins Bold
- h2: 1.8rem, Poppins Bold
- body: 1rem, Inter Regular
- caption: 0.75rem, Inter Regular

### 5. アニメーション

#### ページロード
- 3D Canvas: fadeIn + scale(0.8 → 1.0), duration: 600ms
- Control Panel: slideInRight, duration: 500ms, delay: 200ms

#### ボタンインタラクション
- ホバー: scale(1.05), duration: 200ms
- クリック: ripple effect（シアン）, duration: 400ms

#### スライダー操作
- 値更新: smooth transition, duration: 300ms
- アバター反応: リアルタイム

#### ジェスチャー実行
- フィードバック: Control Panelの軽い上下揺れ, duration: 400ms

### 6. レスポンシブ設計

#### ブレークポイント
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

#### Mobile時のレイアウト
- 3D Canvas: 100%幅
- Control Panel: スクロール可能なサイドパネル

### 7. アクセシビリティ

- フォーカスリング: 2px solid #00d9ff
- コントラスト比: WCAG AA準拠
- キーボードナビゲーション: Tab キーで全要素にアクセス可能

### 8. パフォーマンス最適化

- CSS: Tailwind CSS 4 + カスタムCSS
- アニメーション: GPU加速（transform, opacity）
- 画像: WebP形式、遅延ロード
- Canvas: requestAnimationFrame でリアルタイム更新
