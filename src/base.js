var astUtil = require('./util/ast');

var COMPONENT_DEFAULT_NAME = 'div';
var COMPONENT_VARIABLE_NAME = 'Component$';

function getComponentName(babelTypes, componentAttribute) { // {{{
  var componentName = COMPONENT_DEFAULT_NAME;

  // component name from string attribute value: <Base component="strong" />
  if (babelTypes.isStringLiteral(componentAttribute)) {
    componentName = componentAttribute.value;
  } else
  // component name from conditional expression attribute value:
  // <Base component={a === b ? 'strong' : 'em'} />
  if (babelTypes.isConditionalExpression(componentAttribute)) {
    componentName = COMPONENT_VARIABLE_NAME;
  } else
  // component name from expression attribute value: <Base component={Link} />
  if (babelTypes.isIdentifier(componentAttribute)) {
    componentName = COMPONENT_VARIABLE_NAME;
  }

  return componentName;
} // }}}

module.exports = function(babel) {
  var types = babel.types;
  var baseAttributes = {
    exists: 'exists',
    component: 'component',
  };

  return function(node, file) {
    var result = [];

    var children = astUtil.getChildren(types, node);
    var attributes = astUtil.getAttributes(node);

    var existsAttribute = astUtil.getAttribute(types, attributes, baseAttributes.exists);
    var componentAttribute = astUtil.getAttributeValue(types, attributes, baseAttributes.component);

    var availableAttributes = attributes.filter(function(attr) {
      return (
        types.isJSXSpreadAttribute(attr)
        || typeof baseAttributes[attr.name.name] === 'undefined'
      );
    });

    var componentName = getComponentName(types, componentAttribute);

    if (componentName === COMPONENT_VARIABLE_NAME) {
      result.push(
        astUtil.getVariableDeclaration(
          types,
          'var',
          componentName,
          componentAttribute
        )
      );
    }

    var yes = astUtil.getjSXElement(
      types,
      componentName,
      availableAttributes,
      children
    );
    var no = types.NullLiteral();

    var existsConditionExpression = astUtil.getAttributeConditionExpression(
      types, baseAttributes.exists, existsAttribute
    );

    result.push(
      types.ConditionalExpression(existsConditionExpression, yes, no)
    );

    return result;
  }
};
