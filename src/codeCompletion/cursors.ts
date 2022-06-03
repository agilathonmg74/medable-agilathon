import * as vscode from 'vscode'
import { CortexObject } from '../types/objects'

const handlePathsCursor = (obj: CortexObject) => {
  return obj.properties.map(x => {
    const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable)
    item.insertText = `'${x.name}'`
    return item
  })
}

const handleExpandCursor = (obj: CortexObject) => {
  return obj.properties.filter(x => x.type === 'Reference')
    .map(x => {
      const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable)
      item.insertText = `'${x.name}'`
      return item
    })
}

const handleFindCursor = (obj: CortexObject) => {
  return obj.properties.filter(x => x.indexed)
    .map(x => {
      const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable)
      item.insertText = `${x.name}: ''`
      return item
    })
}

export { handlePathsCursor, handleExpandCursor, handleFindCursor }
