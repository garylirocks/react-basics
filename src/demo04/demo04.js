const React = require('react');
const ReactDOM = require('react-dom');
const Game = require('./playnine-game');

class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#react-container'));
