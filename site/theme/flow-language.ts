/** Colour recipe verbs and JSON operands without interpreting the procedure. */
export const flowLanguage = {
  name: 'flow',
  scopeName: 'source.flow',
  patterns: [
    { name: 'keyword.control.flow', match: '^\\s*(?:call|send|receive|close|return)\\b' },
    { name: 'variable.language.flow', match: '@(?:input|previous|value)\\b|\\?' },
    {
      name: 'string.quoted.double.flow',
      begin: '"',
      end: '"',
      patterns: [{ name: 'constant.character.escape.flow', match: '\\\\.' }],
    },
    { name: 'constant.language.flow', match: '\\b(?:true|false|null)\\b' },
    { name: 'constant.numeric.flow', match: '-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b' },
  ],
}
