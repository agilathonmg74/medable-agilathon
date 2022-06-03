import { StandardConfigDefinition } from './standardDefinition'

const _cursors = require('../settings/cursors.json')

interface Cursor extends StandardConfigDefinition {
  isContinuable?: boolean
}

const cursors: Cursor[] = _cursors

export { Cursor, cursors }