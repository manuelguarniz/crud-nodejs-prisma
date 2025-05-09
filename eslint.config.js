import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import love from 'eslint-config-love'

export default [
  {
    ...love, 
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
