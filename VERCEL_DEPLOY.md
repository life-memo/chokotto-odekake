# Vercelでデプロイする手順（3分で完了）

## 1. Vercelにアクセス

https://vercel.com/ を開く

## 2. GitHubでサインアップ/ログイン

1. 「Sign Up」または「Login」をクリック
2. 「Continue with GitHub」を選択
3. GitHubアカウントでログイン

## 3. プロジェクトをインポート

1. ダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで
3. `life-memo/chokotto-odekake` リポジトリを探す
4. 「Import」をクリック

## 4. プロジェクト設定

以下の設定を確認（自動で検出されるはず）：

- **Framework Preset**: `Other` または `Vite`
- **Build Command**: 空欄のままでOK
- **Output Directory**: 空欄のままでOK
- **Install Command**: `npm install`

そのまま「Deploy」ボタンをクリック！

## 5. デプロイ完了を待つ

- 1-2分でデプロイが完了します
- 緑色のチェックマーク✅が表示されます

## 6. 完成！

デプロイが完了すると、以下のようなURLが発行されます：

```
https://chokotto-odekake.vercel.app
```

または

```
https://chokotto-odekake-life-memo.vercel.app
```

このURLにアクセスすると、完全版のアプリが動作します！

## トラブルシューティング

### ビルドエラーが出る場合

リポジトリに以下のファイルを追加してください：

**package.json**（すでにあります）
**vite.config.js**（これを追加）

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### React関連のエラーが出る場合

Vercelの設定で：
- Framework Preset: `Vite` を選択
- Build Command: `npm run build`
- Output Directory: `dist`

## カスタムドメイン（オプション）

Vercelで独自ドメインも設定できます：
1. プロジェクトの「Settings」→「Domains」
2. 独自ドメインを追加

## 自動デプロイ

今後、GitHubにプッシュするたびに自動でVercelにデプロイされます！
便利！

---

**重要**: VercelはReactアプリを自動でビルドしてくれるので、
JSXファイル（baby-outing-planner.jsx）がそのまま動作します！
