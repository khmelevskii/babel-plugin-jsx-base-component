var React = require('react');
var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');
var shallow = require('enzyme').shallow;
var expect = chai.expect;

chai.use(chaiEnzyme());

describe('Base component with exists prop', function () {
  it('should render if exists prop is not define', function () { // {{{
    var wrapper = shallow(
      <Base>Base component</Base>
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render if exists prop omit the value', function () { // {{{
    var wrapper = shallow(
      <Base exists>Base component</Base>
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render if exists prop is true', function () { // {{{
    var wrapper = shallow(
      <Base exists={true}>Base component</Base>
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should not render if exists prop is false', function () { // {{{
    var wrapper = <Base exists={false}>Base component</Base>;

    expect(wrapper)
      .to.be.null;
  }); // }}}

  it('should render if exists prop expression calc to true', function () { // {{{
    var list = ['a', 'b', 'c'];
    var wrapper = shallow(
      <Base exists={list.length > 0}>Base component</Base>
    );

    expect(wrapper)
      .to.have.text('Base component');
  }); // }}}

  it('should render if exists prop expression calc to false', function () { // {{{
    var list = ['a', 'b', 'c'];
    var wrapper = (
      <Base exists={list.length === 0}>Base component</Base>
    );

    expect(wrapper)
      .to.be.null;
  }); // }}}
});
