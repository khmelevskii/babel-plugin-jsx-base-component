# babel-plugin-jsx-base-component

Это Babel 6 плагин, который позволяет вам использовать в вашем `jsx` компонент
`<Base />`  имеющий два свойства:
- `exists` - указывает на то, отображать содержимое компонента или нет
- `component` - указывает каким компонентом на самом деле является `<Base />`. По умолчанию `<div />`

Дополнительно компонент `<Base />` может принимать свойства, которые будут
переданы в `component`.

**Данный компонент может помочь сделать ваш метод render более читабельным и лаконичным.**

## Syntax and use cases
Что бы показать зачем нужен `<Base />` компонент, рассмотрим его варианты использования
и результат его трансформации:

**1.** Выводим список `ul` если у него есть содержимое.
```javascript
<Base exists={props.comments.length !== 0} component="ul">
  ...
</Base>
```
После трансформации:
```javascript
{ props.comments.length !== 0 ? <ul> ... </ul> : null }
```


**2.** Вы можете использовать условия в свойстве `component`, а также передавать в
него любые react-компоненты.
```javascript
<Base component={props.targetBalnk ? 'a' : Link} href="/dashboard">
  Dashboard
</Base>
```
После трансформации:
```javascript
const Component = props.targetBalnk ? 'a' : Link;
...
return (
  <Component href="/dashboard">
    Dashboard
  </Component>
);
```


**3.** Комплексный пример.
```
  <Base
    component={props.status === 'important' || props.blockApp ? ImportantBar : AlertBar}
    exists={props.isOpen || props.blockApp}
    className={scss.alertBar} icon="car" text={props.text}
  />
```
После трансформации:
```
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

Обратите внимание: данный плагин после трансформации не создает никаких
допоолнительных span'ов или других оберточных тегов.


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
Так как `<Base />` компонент трансформируеться с помощью Babel, то вам не нужно
импортировать(import) или подключать(require) его. Но это, в скою очередь,
приведет к тому, что ESLint будет предепреждать о том, что переменная
Base не определена.
Что бы исправить это, просто добавьте в ваш `.eslintrc` `Base` как глобальную
переменную.
```
"globals": {
  ...
  "Base": true
}
```
