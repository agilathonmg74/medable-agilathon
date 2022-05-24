const vscode = require('vscode')

const handlePathsCursor = (obj) => {
  return obj.properties.map(x => {
    const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable)
    item.insertText = `'${x.name}'`
    return item
  })
}

const handleExpandCursor = (obj) => {
  return obj.properties.filter(x => x.type === 'Reference')
    .map(x => {
      const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable)
      item.insertText = `'${x.name}'`
      return item
    })
}

const handleFindCursor = (obj) => {
  return obj.properties.filter(x => x.indexed)
    .map(x => {
      const item = new vscode.CompletionItem(x.name, vscode.CompletionItemKind.Variable)
      item.insertText = `${x.name}: ''`
      return item
    })
}

module.exports.handlePathsCursor = handlePathsCursor
module.exports.handleExpandCursor = handleExpandCursor
module.exports.handleFindCursor = handleFindCursor
