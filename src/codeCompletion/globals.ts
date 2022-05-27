import * as vscode from 'vscode'

const globalsProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      return [
        new vscode.CompletionItem('org', vscode.CompletionItemKind.Variable),
        new vscode.CompletionItem('script', vscode.CompletionItemKind.Variable),
        new vscode.CompletionItem('consts', vscode.CompletionItemKind.Variable),
        new vscode.CompletionItem('import', vscode.CompletionItemKind.Variable),
        new vscode.CompletionItem('modules', vscode.CompletionItemKind.Variable)

      ]
    }
  },
  ''
)

export { globalsProvider }
