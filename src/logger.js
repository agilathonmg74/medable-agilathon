const vscode = require('vscode')
class Logger {

  static output
  static log(...params) {
    let output = ''
    for (const e of params) {
      if (typeof e === 'string') {
        output = output.concat(' ', e)
      } else {
        output = output.concat(' ', JSON.stringify(e))
      }
    }
    this.output.appendLine(output)
  }

  static init() {
    this.output = vscode.window.createOutputChannel('medable-debug-output')
  }

}

module.exports = Logger