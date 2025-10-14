# Scratch Status 開発移行のお知らせ

本プロジェクト「Scratch Status」は、今後の主要な開発を終了し、  
後継プロジェクト **[Scratch Status Monitor](https://github.com/scratchcore/scratch-status-monitor)** に開発の主軸を移行しました。

なお、本リポジトリは今後も存続し、  
**致命的な不具合やセキュリティ上の問題が確認された場合には、必要に応じて修正対応を行う予定です。**

---

<details>
<summary>詳細はこちら</summary>

本サービスは当初、個人利用を目的として開発されたものであり、  
大規模なアクセスや長期運用を前提とした設計ではありませんでした。

リリース直後、[Vercel ](https://vercel.com/home)の無料枠制限により運営が難しくなったため、  
一時的にサイトを閉鎖し、その後 [AWS Amplify](https://aws.amazon.com/jp/amplify/) へ移行して 12 ヶ月間の無料枠で運営を継続してきました。

しかし、現行構成では最適化が不十分で、  
運用コストやリソース効率の面で課題が残っていました。  
そのため、アーキテクチャを基礎から見直し、より効率的で拡張性の高い構成を目指す形で  
後継プロジェクト **[Scratch Status Monitor](https://github.com/scratchcore/scratch-status-monitor)** の開発を進めています。

新プロジェクトでは、  
運用性・パフォーマンス・メンテナンス性を大幅に改善し、  
より安定した監視環境の提供を目指しています。

なお、後継プロジェクトが一般公開されるまでの間は、  
本サービスを継続して一般公開する予定です。

</details>
