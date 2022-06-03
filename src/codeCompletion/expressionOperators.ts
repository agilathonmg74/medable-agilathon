import * as vscode from 'vscode'
import { expressionOperators } from '../types/expressionOperators'
import { mapToCompletionItem } from './helpers'

const expressionOperatorsProvider = vscode.languages.registerCompletionItemProvider(
  'javascript',
  {
    provideCompletionItems(document, position) {
      return expressionOperators.map(x => {
        const completionType = getCompletionTypeFromOperatorType(x.type)
        const item = mapToCompletionItem(x, completionType)
        item.sortText = completionType.toString()
        return item
      })
    }
  },
  '$'
)

const getCompletionTypeFromOperatorType = (operatorType: string): vscode.CompletionItemKind => {
  switch (operatorType) {
    case 'operators':
      return vscode.CompletionItemKind.Operator
    case 'pipelines':
      return vscode.CompletionItemKind.Function
    case 'accumulators':
      return vscode.CompletionItemKind.Value
    case 'variables':
      return vscode.CompletionItemKind.Variable
    case 'conditionals':
      return vscode.CompletionItemKind.Module
    default:
      return vscode.CompletionItemKind.Keyword
  }
}

export { expressionOperatorsProvider }
