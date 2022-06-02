import * as vscode from 'vscode'
import { getCurrentStatement } from './helpers'
import { imports } from '../types/standardDefinition'

const importProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.fullStatement.startsWith('import') && currentStatement.fullStatement.endsWith('import')) {

        return imports.map(x => {
          const item = new vscode.CompletionItem(x.item, vscode.CompletionItemKind.Method)
          item.insertText = x.text
          item.detail = x.detail
          item.documentation = new vscode.MarkdownString(x.documentation)
          return item
        })

      }
    }

  },
  ' ' // triggered chars

)

export { importProvider }