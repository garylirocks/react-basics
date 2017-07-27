const React = require('react');
const ReactDOM = require('react-dom');

class Button extends React.Component {
    handleClick = () => {
        this.props.onClickFunction(this.props.incrementValue);
    };

    render() {
        return (
            <button onClick={this.handleClick}>{this.props.incrementValue}</button>
        )
    }
}

// NOTE this component only shows a number, do not have any state, so it's defined as
//      a function Component
const Result = function(props) {
    return (
        <div>{props.value}</div>
    );
};

// NOTE this global component combines two stateless components together
class App extends React.Component {
    // NOTE this syntax requires babel-preset-stage-1
    state = {
        counter: 0
    };

    // NOTE this syntax requires babel-preset-stage-1
    //          this insures 'this' always refer to the button component
    handleClick = (increment) => {
        // NOTE pass a function to 'setState' insteadof an object to avoid the race condition
        this.setState((prevState) => ({
            counter: prevState.counter + increment
        }));
    };

    render() {
        return (
            <div>
                <Button incrementValue={1} onClickFunction={this.handleClick} />
                <Button incrementValue={5} onClickFunction={this.handleClick} />
                <Button incrementValue={100} onClickFunction={this.handleClick} />

                <Result value={this.state.counter} />
            </div>
        );
    };
}

ReactDOM.render(<App />,
        document.querySelector('#react-container'));
