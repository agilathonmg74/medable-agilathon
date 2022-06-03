import * as vscode from 'vscode'
export default class Logger {

  static output : vscode.OutputChannel
  static log(...params: any[]) {
    let outputString = ''
    for (const e of params) {
      if (typeof e === 'string') {
        outputString = outputString.concat(' ', e)
      } else {
        outputString = outputString.concat(' ', JSON.stringify(e))
      }
    }
    this.output.appendLine(outputString)
  }

  static init() {
    this.output = vscode.window.createOutputChannel('medable-debug-output')
  }

}