// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  Disposable,
  ExtensionContext,
  StatusBarAlignment,
  StatusBarItem,
  TextDocument,
  window
} from "vscode"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "markdown-char-counter" is now active!')

  const charCounter = new CharCounter()
  const controller = new CharCountController(charCounter)

  context.subscriptions.push(controller)
  context.subscriptions.push(charCounter)
}

// this method is called when your extension is deactivated
export function deactivate() {}

class CharCounter {
  #statusBarItem: StatusBarItem

  constructor() {
    this.#statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)
  }

  dispose() {
    this.#statusBarItem.dispose()
  }

  public updateCount() {
    const editor = window.activeTextEditor
    if (!editor) return this.#statusBarItem.hide()
    const doc = editor.document
    if (doc.languageId !== "markdown") this.#statusBarItem.hide()
    const charCount = this.#getCharCount(doc)
    this.#statusBarItem.text = charCount + (charCount !== 1 ? " Chars" : "Char")
    this.#statusBarItem.show()
  }

  #getCharCount(doc: TextDocument) {
    let docContent = doc.getText()
    // コードブロック除外
    docContent = docContent.replace(/```.*?\r?\n[\s\S]*?\r?\n```/g, "")
    // frontmatter除外
    docContent = docContent.replace(/---\r?\n[\s\S]*?\r?\n---/g, "")
    // リンクURL除外
    docContent = docContent.replace(/\[(.*?)\]\(.*?\)/g, "$1")
    // 空白除去
    docContent = docContent.replace(/\s/g, "")
    // 改行文字除去
    docContent = docContent.replace(/\r?\n/g, "")
    //
    return docContent.length
  }
}

class CharCountController {
  #charCounter: CharCounter
  #disposable: Disposable

  constructor(charCounter: CharCounter) {
    this.#charCounter = charCounter

    const subscriptions: Disposable[] = []
    window.onDidChangeTextEditorSelection(this.#onEvent, this, subscriptions)
    window.onDidChangeActiveTextEditor(this.#onEvent, this, subscriptions)

    this.#charCounter.updateCount()
    this.#disposable = Disposable.from(...subscriptions)
  }

  dispose() {
    this.#disposable.dispose()
  }

  #onEvent() {
    this.#charCounter.updateCount()
  }
}
