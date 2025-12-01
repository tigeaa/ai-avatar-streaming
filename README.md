# AI Avatar Streaming System

Three.js、Web Speech API、Ready Player Meを使用したAIアバター配信システム。リップシンク、ジェスチャー制御、自動瞬き機能を搭載。

## 🎨 デザイン: モダンクリエイティブスタジオ

**Design Movement**: Bauhaus × Digital Minimalism

### 色彩パレット
- **背景**: 深い紫黒（#0f0a1f）から青黒（#1a1a3e）へのグラデーション
- **アクセント**: 鮮やかなシアン（#00d9ff）とマゼンタ（#ff006e）
- **テキスト**: 白（#ffffff）と薄いグレー（#e0e0e0）

### レイアウト
- **左側**: 3D Canvas表示領域（70%）
- **右側**: コントロールパネル（30%）
- **ガラスモーフィズム**: 半透明のバックドロップフィルター効果

## 🚀 技術スタック

- **フロントエンド**: React 19 + Tailwind CSS 4 + shadcn/ui
- **3D**: Three.js 0.158.0
- **音声**: Web Speech API（TTS）
- **アバター**: Ready Player Me
- **ビルド**: Vite

## ✨ 主要機能

- 3Dアバターのリアルタイムレンダリング
- テキスト入力による音声合成
- リップシンク自動制御
- ジェスチャーアニメーション
- 自動瞬き機能
- OBS Studioへのキャプチャ対応

## 📦 インストール

```bash
pnpm install
pnpm dev
```

## 🔧 開発

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番サーバー起動
pnpm start
```

## 📄 ライセンス

MIT
