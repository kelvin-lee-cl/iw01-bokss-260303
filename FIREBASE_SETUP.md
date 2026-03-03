# Firebase 規則設定說明

「已連接但無法存取」通常是 **規則** 或 **專案不一致** 造成的。請依下面步驟檢查。

## 1. 確認專案

本網站使用的專案是 **iw01-bokss-260303**（classppt.html、teacherdashboard.html、classppt-firebase.js 皆同）。

- 打開 [Firebase Console](https://console.firebase.google.com/)
- 左上角切換到專案 **iw01-bokss-260303**

## 2. 設定 Firestore 規則（文字提交）

- 左側 **Firestore Database** → **規則**
- 貼上 `firestore.rules` 的內容，或至少包含：

```
match /submissions/{docId} {
  allow read, write: if true;
}
```

- 按 **發布**

## 3. 設定 Storage 規則（圖片上傳）

- 左側 **Storage** → **規則**
- 貼上 `storage.rules` 的內容，或至少允許 `stories/`：

```
match /stories/{allPaths=**} {
  allow read, write: if true;
}
```

- 按 **發布**

## 4. 再試一次

- 重新整理 classppt 頁面
- 再試一次「提交」

若仍失敗，請看瀏覽器彈出的錯誤訊息（例如 `[permission-denied]`），並確認是在 **同一個專案** 的 Firestore / Storage 規則中已發布上述規則。
