const vscode = require('vscode')

const globalsProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      return [
        new vscode.CompletionItem('org', vscode.CompletionItemKind.Variable),
        new vscode.CompletionItem('script', vscode.CompletionItemKind.Variable),
        new vscode.CompletionItem('consts', vscode.CompletionItemKind.Variable)
      ]
    }
  },
  ''
)

module.exports.globalsProvider = globalsProvider
