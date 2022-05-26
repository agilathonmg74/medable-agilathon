const _imports = require('../settings/imports.json')

interface Import {
  name: string,
  value: string
}

const imports: Import[] = _imports
export { Import, imports }