import * as vscode from 'vscode'
import { getCurrentStatement, mapToCompletionItem } from './helpers'
import { imports } from '../types/standardDefinition'

const importProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      const currentStatement = getCurrentStatement(document, position.line, position.character)
      if (currentStatement.fullStatement.startsWith('import') && currentStatement.fullStatement.endsWith('import')) {

        return imports.map(x => mapToCompletionItem(x, vscode.CompletionItemKind.Method))

      }
    }

  },
  ' ' // triggered chars

)

export { importProvider }