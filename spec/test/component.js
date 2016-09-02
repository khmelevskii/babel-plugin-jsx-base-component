var React = require('react');
var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');
var shallow = require('enzyme').shallow;
var Button = require('../fixtures/Button');
var expect = chai.expect;

chai.use(chaiEnzyme());

describe('Base component with component prop', function() {
  it('should render tag "div" if component prop is not define', function() { // {{{
    var wrapper = shallow(
      <Base>Base component</Base>
    );

    expect(wrapper)
      .to.have.tagName('div');
  }); // }}}

  it('should render tag "span" if component prop is define', function() { // {{{
    var wrapper = shallow(
      <Base component="span">Base component</Base>
    );

    expect(wrapper)
      .to.have.tagName('span');
  }); // }}}

  it('should render define component', function() { // {{{
    var wrapper = shallow(
      <Base component={Button}>Base component</Base>
    );

    expect(wrapper)
      .to.have.tagName('button');
  }); // }}}

  it('should render component by expression', function() { // {{{
    var wrapper = shallow(
      <Base component={1 === 2 ? Button : 'strong'}>Base component</Base>
    );

    expect(wrapper)
      .to.have.tagName('strong');
  }); // }}}

  it('should render component and pass props to component', function() { // {{{
    var wrapper = shallow(
      <Base component="button" type="submit">Base component</Base>
    );

    expect(wrapper)
      .to.have.tagName('button')
      .and
      .to.have.attr('type', 'submit');
  }); // }}}

  it('should render component and pass spread props to component', function() { // {{{
    var props = {
      type: 'submit',
      children: 'Button',
    };
    var wrapper = shallow(
      <Base component="button" {...props} />
    );

    expect(wrapper)
      .to.have.tagName('button')
      .and
      .to.have.attr('type', 'submit');

    expect(wrapper)
      .to.have.text('Button');
  }); // }}}
});
