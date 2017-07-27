/** ====================
 *  NOTE
 *      a function Component: it has props, but not state
 *      props
 *      onClick event
 ** ==================== **/

const React = require('react');
const ReactDOM = require('react-dom');

const Button = function(props) {
  var shout = function () {
      window.alert('Hi there, React is running');
  };

  return (
    <button onClick={shout}>{props.label}</button>
  );
};

ReactDOM.render(<Button label="Click me"/>, document.querySelector('#react-container'));
