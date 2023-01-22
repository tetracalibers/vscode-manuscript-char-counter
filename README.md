# Markdown Character Counter for VScode

![Screenshots：status bar](https://raw.githubusercontent.com/tetracalibers/vscode-manuscript-char-counter/main/img/statusbar.png)

![Screenshots：3095 Chars](https://raw.githubusercontent.com/tetracalibers/vscode-manuscript-char-counter/main/img/3095chars.png)

## Documentation in English

Tools for writing markdown manuscripts.

To convert the number of characters that the reader will eventually read, the number of characters is displayed in real time, excluding code blocks, etc.

Specifically, the extension counts characters based on the following rules.

### Exclude code blocks

The area enclosed by <code>```</code> is counted as zero characters.

That is, the following example counts as zero characters.

<pre>
<code>```js
console.log('Not counted here.')
```</code>
</pre>

### Exclude YAML Front-matter

The area enclosed by `---` is counted as zero characters.

That is, the following example counts as zero characters.

```
---
title: Not counted here.
---
```

### Exclude link URLs

Readers will only read the link text, and including long URLs in the character count of the manuscript will introduce errors.

Therefore, links are converted to the number of characters in the link text only.

The following example counts as 4 characters.

```
[text](https://example.com)
```

The syntax `![text](URL)` is similar.

### Exclude all spaces, tabs, and newlines

All spaces are removed before counting the number of characters.

---

## 日本語によるドキュメント

markdownでの原稿執筆に役立つツールです。

最終的に読者が読むことになる文字数を換算するため、コードブロックなどを除いた文字数をリアルタイムで表示します。

具体的には、この拡張機能は次の規則に基づいて文字数をカウントします。

### コードブロックを除外

<code>```</code>で囲まれた複数行の領域は0文字としてカウントされます。

つまり、次の例は0文字になります。

<pre>
<code>```js
console.log('ここはカウントされません。')
```</code>
</pre>

### YAML Front-matterを除外

`---`で囲まれた複数行の領域は0文字としてカウントされます。

つまり、次の例は0文字になります。

```
---
title: ここはカウントされません。
---
```

### リンクのURLを除外

読者が読むのはリンクテキストだけであり、長いURLを原稿の文字数に含めると誤差が生じます。

そのため、リンクはリンクテキストのみの文字数を換算します。

次の例は4文字としてカウントされます。

```
[テキスト](https://example.com)
```

`![テキスト](URL)`という構文も同様です。

### すべての空白、タブ、改行を除外

空白文字はすべて削除した上で文字数をカウントします。