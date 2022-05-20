const objects = require('./objects.json')
const cursors = require('./cursors.json')

const getCurrentStatement = (document, line) => {
  const currentLine = document.lineAt(line).text.trim()
  if (line === 0) {
    return currentLine
  }
  if (currentLine.charAt(0) !== '.') {
    return currentLine
  }

  return getCurrentStatement(document, line - 1)
    .concat(currentLine)
}

const getObjectFromQueryStatement = (currentStatement) => {
  const index = currentStatement.indexOf('org.objects')
  if (index < 0) {
    return null
  }
  const queryStatement = currentStatement.substring(index)
  const splitted = queryStatement.split('.')
  if (splitted.length < 3) {
    return null
  }

  return objects.find(x => x.name === splitted[2])

}

const getOptionsForQueryStatement = (currentStatement, object) => {
  const splitted = currentStatement.split('.')
  const lastElement = splitted[splitted.length - 2]

  if (lastElement === object.name) {
    return cursors
  }

  const cursor = cursors.find(x => lastElement.includes(x.name))
  if (cursor) {
    if (cursor.isContinuable) {
      return cursors
    }
  }

  return []
}

module.exports.getCurrentStatement = getCurrentStatement
module.exports.getObjectFromQueryStatement = getObjectFromQueryStatement
module.exports.getOptionsForQueryStatement = getOptionsForQueryStatement