const _cursors = require('../settings/cursors.json')

interface Cursor {
  name: string,
  isContinuable?: boolean
}

const cursors: Cursor[] = _cursors

export { Cursor, cursors }