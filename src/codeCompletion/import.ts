import * as vscode from 'vscode'
import { getCurrentStatement } from './helpers'
import { imports } from '../types/imports'

const importProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.fullStatement.startsWith('import') && currentStatement.fullStatement.endsWith('import')) {

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

export { importProvider }