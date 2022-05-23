const objects = require('../settings/objects.json')
const cursors = require('../settings/cursors.json')
const consts = require('../settings/consts.json')
const script = require('../settings/script.json')

const bracketPairs = {
  parentheses: ['(', ')'],
  curly: ['{', '}'],
  square: ['[', ']']
}

const getCurrentStatement = (document, line, characther = -1) => {
  const currentLine = characther < 1
    ? document.lineAt(line).text.trim()
    : document.lineAt(line).text.substring(0, characther)
      .trim()

  if (line === 0) {
    return currentLine
  }
  if (currentLine.charAt(0) !== '.') {
    return currentLine
  }

  return getCurrentStatement(document, line - 1)
    .concat(currentLine)
}

const getStatementInsideOfBrackets = (statement, bracketChars) => {
  if (bracketChars.length !== 2) {
    return null
  }
  const brackets = statement.split('')
    .map((x, index) => { return { value: x, index: index } })
    .filter(x => x.value === bracketChars[0] || x.value === bracketChars[1])

  const bracketPairs = []
  for (const e of brackets) {
    if (e.value === bracketChars[0]) {
      bracketPairs.push(e.index)
    } else {
      bracketPairs.pop()
    }
  }

  if (bracketPairs.some()) {
    const index = bracketPairs[bracketPairs.length - 1]
    return { index: index, arguments: statement.substring(index + 1) || '' }
  }
}

const getFunctionArguments = (statement) => {
  return getStatementInsideOfBrackets(statement, bracketPairs.parentheses)
}

const getObjectBody = (statement) => {
  return getStatementInsideOfBrackets(statement, bracketPairs.curly)
}

const getObjectFromQueryStatement = (statement) => {
  const index = statement.indexOf('org.objects')
  if (index < 0) {
    return null
  }
  const queryStatement = statement.substring(index)
  const splitted = queryStatement.split('.')
  if (splitted.length < 3) {
    return null
  }

  return objects.find(x => x.name === splitted[2])

}

const getOptionsForQueryStatement = (statement, object) => {
  const splitted = statement.split('.')
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

const getOptionsForConstsStatement = (statement) => {
  return getOptionsForStatementSimple(statement, 'consts.', consts)
}

const getOptionsForScriptStatement = (statement) => {
  return getOptionsForStatementSimple(statement, 'script.', script)
}

const getOptionsForStatementSimple = (statement, prefix, obj) => {
  const index = statement.indexOf(prefix)
  if (index < 0) {
    return null
  }

  if (statement.endsWith(prefix)) {
    return Object.keys(obj)
  }

  const splitted = statement.substring(index)
    .split('.')

  let currentObject = obj
  for (let i = 1; i < splitted.length; i++) {
    if (!splitted[i] || splitted[i].trim() === '') {
      break
    }
    if (!currentObject[splitted[i]]) {
      return null
    }
    currentObject = currentObject[splitted[i]]
  }

  return Object.keys(currentObject)

}

const getOptionsForCursor = (statement, object) => {
  const functionArguments = getFunctionArguments(statement)
  const s = statement.substring(0, functionArguments.index)
  const cursor = cursors.find(x => s.endsWith(x.name))
  if (cursor) {

  }
}

module.exports.getCurrentStatement = getCurrentStatement
module.exports.getObjectFromQueryStatement = getObjectFromQueryStatement
module.exports.getOptionsForQueryStatement = getOptionsForQueryStatement
module.exports.getOptionsForConstsStatement = getOptionsForConstsStatement
module.exports.getOptionsForScriptStatement = getOptionsForScriptStatement
module.exports.getOptionsForCursor = getOptionsForCursor