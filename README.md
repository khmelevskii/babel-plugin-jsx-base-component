# babel-plugin-jsx-base-component

[![Build Status](https://travis-ci.org/khmelevskii/babel-plugin-jsx-base-component.svg?branch=master)](https://travis-ci.org/khmelevskii/babel-plugin-jsx-base-component)
[![Coverage Status](https://coveralls.io/repos/github/khmelevskii/babel-plugin-jsx-base-component/badge.svg)](https://coveralls.io/github/khmelevskii/babel-plugin-jsx-base-component)
[![npm version](https://img.shields.io/npm/v/babel-plugin-jsx-base-component.svg?style=flat)](https://www.npmjs.com/package/babel-plugin-jsx-base-component)

This is Babel 6 plugin allowing to use `<Base />` component in your `jsx`.
It has two properties:
- `exists` - specifies whether the component content is shown
- `component` - shows which component `<Base />` actually is. It is `<div />` by default

In addition `<Base />` component can take properties, that will be passed to `component`.

**This component can help make your render method more readable and concise.**

## Syntax and use cases
To show the purpose of `<Base />` component let's consider its variants of use 
and the result of its transformation:

**1.** List `ul` content is any.
```javascript
<Base exists={props.comments.length !== 0} component="ul">
  ...
</Base>
```
After transformation:
```javascript
{ props.comments.length !== 0 ? <ul> ... </ul> : null }
```


**2.** You can use conditions in `component` property, and also pass any react-components to it.
```javascript
<Base component={props.targetBalnk ? 'a' : Link} href="/dashboard">
  Dashboard
</Base>
```
After transformation:
```javascript
const Component = props.targetBalnk ? 'a' : Link;
...
return (
  <Component href="/dashboard">
    Dashboard
  </Component>
);
```


**3.** Complex Example.
```javascript
  <Base
    component={props.status === 'important' || props.blockApp ? ImportantBar : AlertBar}
    exists={props.isOpen || props.blockApp}
    className={scss.alertBar} icon="car" text={props.text}
  />
```
After transformation:
```javascript
const Component = props.status === 'important' || props.blockApp ? ImportantBar : AlertBar;
...
return (
  {
    props.isOpen || props.blockApp
    ? <Component className={scss.alertBar} icon="car" text={props.text} />
    : null
  }
);
```

Note: After transformation this plugin does not create any additional spans 
or other wrapping tags.


## Installation
As a prerequisite you need to have [Babel](https://github.com/babel/babel) installed and configured in your project.

Install via npm:

```
  npm install babel-plugin-jsx-base-component --save-dev
```

Then you only need to specify `jsx-base-component` as Babel plugin, which you would typically do in your `.babelrc`:
```
"plugins": [
  ...
  "jsx-base-component"
]
```

## Linting
Since `<Base />` component is transformed using Babel, you don't need
to import (import) or plug it in (require). But in its turn 
it will result in ESLint warning that Base variable is undefined.
To fix this, just add `Base` as global variable in your `.eslintrc` 

```
"globals": {
  ...
  "Base": true
}
```
