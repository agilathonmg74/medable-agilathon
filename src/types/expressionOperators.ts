import { StandardConfigDefinition } from './standardDefinition'

const _expressionOperators = require('../settings/expressionOperatorsData.json')

interface ExpressionOperator extends StandardConfigDefinition {
  type: string
}

const expressionOperators: ExpressionOperator[] = _expressionOperators

export { ExpressionOperator, expressionOperators }