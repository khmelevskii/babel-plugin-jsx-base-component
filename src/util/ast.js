/**
 * Get all attributes from given element.
 *
 * @param {JSXElement} node - Current node from which attributes are gathered
 * @returns {object} Map of all attributes with their name as key
 */
function getAttributes(node) { // {{{
  return node.openingElement.attributes || [];
}; // }}}

/**
 *
 *
 * @param {object} babelTypes - Babel lib
 * @param {Array} attributes -
 * @param {String} name - Attribute name
 * @returns {JSXAttribute | JSXSpreadAttribute}
 */
function getAttribute(babelTypes, attributes, name) { // {{{
  return (attributes || []).find(function(attr) {
    if (babelTypes.isJSXSpreadAttribute(attr)) {
      return false;
    }

    return attr.name.name === name;
  });
}; // }}}

/**
 *
 *
 * @param {object} babelTypes - Babel lib
 * @param {Array} attributes -
 * @param {String} name - Attribute name
 * @returns {JSXElement | StringLiteral | Expression}
 */
function getAttributeValue(babelTypes, attributes, name) { // {{{
  var attribute = getAttribute(babelTypes, attributes, name);

  if (typeof attribute === 'undefined') {
    return attribute;
  }

  var attributeValue = attribute.value;

  if (typeof attributeValue.expression !== 'undefined') {
    return attributeValue.expression;
  }

  return attributeValue;
}; // }}}

/**
 *
 *
 * @param {object} babelTypes - Babel lib
 * @param {var | let | const} kind
 * @param {String} name - Variable name.
 * @param {Expression} value - Variable value.
 * @returns {VariableDeclaration}
 */
function getVariableDeclaration(babelTypes, kind, name, value) { // {{{
  return babelTypes.variableDeclaration(kind, [
    babelTypes.variableDeclarator(
      babelTypes.identifier(name),
      value
    ),
  ]);
}; // }}}

/**
 * Get all children from given element.
 *
 * @param {object} babelTypes - Babel lib
 * @param {JSXElement} node - Current node from which children are gathered
 * @returns {array}
 */
function getChildren(babelTypes, node) { // {{{
  var children = babelTypes.react.buildChildren(node);

  return children.map(function(item) {
    if (babelTypes.isStringLiteral(item)) {
      return babelTypes.JSXText(item.value);
    }

    if (
      babelTypes.isIdentifier(item) ||
      babelTypes.isMemberExpression(item) ||
      babelTypes.isCallExpression(item) ||
      babelTypes.isConditionalExpression(item) ||
      babelTypes.isLogicalExpression(item) ||
      babelTypes.isFunctionExpression(item) ||
      babelTypes.isArrowFunctionExpression(item) ||
      babelTypes.isArrayExpression(item) ||
      babelTypes.isNumericLiteral(item) ||
      babelTypes.isBooleanLiteral(item)
    ) {
      return babelTypes.jSXExpressionContainer(item);
    }

    return item;
  });
}; // }}}

/**
 *
 *
 * @param {object} babelTypes - Babel lib
 * @param {String} nameAttribute -
 * @param {JSXAttribute} attribute -
 * @returns {JSXExpressionContainer}
 */
function getAttributeConditionExpression(babelTypes, nameAttribute, attribute) { // {{{
  if (typeof attribute === 'undefined' || attribute.value === null) {
    return babelTypes.booleanLiteral(true);
  }

  return attribute.value.expression;
}; // }}}

/**
 * Get all children from given element.
 *
 * @param {object} babelTypes - Babel lib
 * @param {String} name -
 * @param {Array<JSXAttribute>} attributes -
 * @param {Array<JSXText | JSXExpressionContainer | JSXElement>} children -
 * @returns {jSXElement}
 */
function getjSXElement(babelTypes, name, attributes, children) { // {{{
  return babelTypes.jSXElement(
    babelTypes.JSXOpeningElement(
      babelTypes.jSXIdentifier(name),
      attributes,
      true
    ),
    null,
    children,
    true
  );
}; // }}}

module.exports = {
  getAttributes: getAttributes,
  getAttribute: getAttribute,
  getAttributeValue: getAttributeValue,
  getVariableDeclaration: getVariableDeclaration,
  getAttributeConditionExpression: getAttributeConditionExpression,
  getChildren: getChildren,
  getjSXElement: getjSXElement,
};
