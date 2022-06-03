export default class Statement {

  fullStatement: string
  argumentsStatement: string | null

  constructor(fullStatement: string, argumentsStatement: string) {
    this.fullStatement = fullStatement
    this.argumentsStatement = argumentsStatement
  }

}