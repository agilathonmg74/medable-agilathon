const vscode = require('vscode')
const { getCurrentStatement, getObjectFromQueryStatement, getOptionsForQueryStatement } = require('./helpers')
const objects = require('./objects.json')

const staticProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      return [
        new vscode.CompletionItem('org', vscode.CompletionItemKind.Variable),
        new vscode.CompletionItem('script', vscode.CompletionItemKind.Variable)
      ]
    }
  },
  ''
)

const orgProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line)
      if (currentStatement.endsWith('org.')) {
        return [
          new vscode.CompletionItem('objects', vscode.CompletionItemKind.Variable),
          new vscode.CompletionItem('_id', vscode.CompletionItemKind.Variable),
          new vscode.CompletionItem('code', vscode.CompletionItemKind.Variable)
        ]
      }

      if (currentStatement.endsWith('org.objects.')) {
        return objects.map(x => new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable))
      }

      const objectQuery = getObjectFromQueryStatement(currentStatement)
      if (objectQuery) {
        return getOptionsForQueryStatement(currentStatement, objectQuery)
          .map(x => new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Method))
      }

      return undefined
    }
  },
  '.' // triggered whenever a '.' is being typed
)

module.exports.staticProvider = staticProvider
module.exports.orgProvider = orgProvider