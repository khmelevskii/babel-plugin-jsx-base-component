var transformBase = require('./base');

module.exports = function (babel) {
  var baseComponentName = 'Base';

  var visitor = {
    JSXElement: function (path) {
      var nodeName = path.node.openingElement.name.name;

      if (baseComponentName === nodeName) {
        var handler = transformBase(babel);

        path.replaceWithMultiple(
          handler(path.node, path.hub.file)
        );
      }
    }
  };

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: visitor
  };
};
