const vscode = require('vscode')
const { getCurrentStatement } = require('./helpers')
const imports = require('../settings/imports.json')

const importProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.startsWith('import') && currentStatement.endsWith('import')) {

        return imports.map(x => {
          const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable)
          item.insertText = x.value
          return item
        })

      }
    }

  },
  ' ' // triggered chars

)

module.exports.importProvider = importProvider
