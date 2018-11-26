const { createMacro } = require('babel-plugin-macros');

module.exports = createMacro(requireContextMacro);

function requireContextMacro({ references, state, babel: { types: t } }) {
  // This copied from https://github.com/smrq/babel-plugin-require-context-hook

  // const visitor = {
  //   Identifier: path => {
  //     console.log('got path');
  //     // if (
  //     //   t.isMemberExpression(path.node.callee, { computed: false }) &&
  //     //   t.isIdentifier(path.get('callee').node.object, { name: 'require' }) &&
  //     //   t.isIdentifier(path.get('callee').node.property, { name: 'context' })
  //     // ) {
  //     //   console.log('replacing');

  //     // }
  //   },
  // };

  if (process.env.NODE_ENV === 'test') {
    references.default.forEach(path =>
      path.parentPath.replaceWith(
        t.callExpression(t.identifier('__requireContext'), [
          t.identifier('__dirname'),
          ...path.parent.arguments,
        ])
      )
    );
  } else {
    references.default.forEach(path =>
      path.parentPath.replaceWith(
        t.callExpression(t.identifier('require.context'), [...path.parent.arguments])
      )
    );
  }
}
