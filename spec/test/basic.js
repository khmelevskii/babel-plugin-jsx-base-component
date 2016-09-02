var React = require('react');
var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');
var shallow = require('enzyme').shallow;
var expect = chai.expect;

chai.use(chaiEnzyme());

describe('Base component with children', function() {
  it('should render component when children is variable', function() { // {{{
    var children = 'Base component';
    var wrapper = shallow(
      <Base>{children}</Base>
    );

    expect(wrapper)
      .to.have.text('Base component')
  }); // }}}

  it('should render component when children is conditional expression', function() { // {{{
    var wrapper = shallow(
      <Base>{1 === 2 ? 'yes' : 'no'}</Base>
    );

    expect(wrapper)
      .to.have.text('no')
  }); // }}}

  it('should render component when children is logical expression', function() { // {{{
    var noValueVariable;

    var wrapper = shallow(
      <Base>{noValueVariable || 'blank'}</Base>
    );

    expect(wrapper)
      .to.have.text('blank')
  }); // }}}

  it('should render component when children is call expression', function() { // {{{
    var list = ['this', 'is', 'base', 'component'];

    var wrapper = shallow(
      <Base>
        {
          list.map(function(value) {
            return value.toUpperCase();
          })
        }
      </Base>
    );

    expect(wrapper)
      .to.have.text('THISISBASECOMPONENT')
  }); // }}}

  it('should render component when children is member expression', function() { // {{{
    var list = ['this', 'is', 'base', 'component'];
    var wrapper = shallow(
      <Base>{list[0]}</Base>
    );

    expect(wrapper)
      .to.have.text('this')
  }); // }}}

  it('should render component when children is function expression', function() { // {{{
    var wrapper = shallow(
      <Base>{function() { return 'Base component'; }()}</Base>
    );

    expect(wrapper)
      .to.have.text('Base component')
  }); // }}}

  it('should render component when children is arrow function expression', function() { // {{{
    var wrapper = shallow(
      <Base>{(() => 'Base component')()}</Base>
    );

    expect(wrapper)
      .to.have.text('Base component')
  }); // }}}

  it('should render component when children is array expression', function() { // {{{
    var wrapper = shallow(
      <Base>{['Base', ' ', 'component']}</Base>
    );

    expect(wrapper)
      .to.have.text('Base component')
  }); // }}}

  it('should render component when children is numeric literal', function() { // {{{
    var wrapper = shallow(
      <Base>{3.14}</Base>
    );

    expect(wrapper)
      .to.have.text('3.14')
  }); // }}}

  it('should render component when children is boolean literal', function() { // {{{
    var wrapper = shallow(
      <Base>{true}</Base>
    );

    expect(wrapper)
      .to.have.text('')
  }); // }}}

  it('should render component with complex children', function() { // {{{
    var list = ['this', 'is', 'base', 'component'];

    var a = list.map(function(value) {
      return value.toUpperCase();
    });

    var wrapper = shallow(
      <Base>
        This is
        <strong>Base</strong> <strong>component</strong>
        {list.length > 0 ? '.' : '!'}
      </Base>
    );

    expect(wrapper)
    .to.have.html('<div>This is<strong>Base</strong> <strong>component</strong>.</div>');
  }); // }}}
});
