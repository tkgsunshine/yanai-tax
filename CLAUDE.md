# yanai-tax（yanai-tax.jp）

Antigravity(AG)から Claude Code(CC)へ引き継ぎ済み。今後の開発はCCで行う。

- 静的サイト（`index.html` / `style.css` / `script.js`）。`style.min.css` は `style.css` から生成されるため、CSSを変えたら両方の整合を保つ。
- 本番ドメインは `yanai-tax.jp`。canonical・OGP・`sitemap.xml` は独自ドメインで統一する。
- 作業ブランチで変更し、PRで反映する。依頼のないファイル削除をしない（`アーカイブ.zip` を含む）。

- 開発アイデア: ユーザーが新機能・改善のアイデアを話したら、`.claude/agents/dev-employee.md` の「今後の開発アイデアの保存」に従い、日報ダッシュボード（https://claude.ai/artifact/VCP5kV7TA7NDHjZe9d4gNF）の `dev_ideas` に保存する（実装は依頼があるまでしない）。
