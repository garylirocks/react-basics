import React from 'react';
import ReactDOM from 'react-dom';

import Book from './book';
import Data from './data';
import PropTypes from 'prop-types';

const _ = require('lodash');

class App extends React.Component {
    static propTypes: {
        books: PropTypes.array
    };

    getDefaultState = () => {
        return Object.assign(this.props.data.selectGame(), {
                isCorrect: false,
                selected: null
            });
    };

    state = this.getDefaultState();

    refresh = () => {
        this.setState(this.getDefaultState());
    };

    checkAnswer = (i) => {
        let title = this.state.books[i];
        if (this.state.author.titles.indexOf(title) >= 0) {
            this.setState({
                selected: i,
                isCorrect: true
            });
        } else {
            this.setState({
                selected: i,
                isCorrect: false
            });
        }
    };

    render() {
        console.log(this.state);

        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.state.author.imageUrl} />
                    </div>
                    <div className="col-md-7">
                        {this.state.books.map((b, i) => {
                            return <Book title={b} key={i} id={i} selected={i === this.state.selected} isCorrect={this.state.isCorrect}
                                selectionHandler={this.checkAnswer} />;
                        })}
                    </div>
                    <div className="col-md-1"></div>
                </div>
                {
                    this.state.isCorrect ?
                        (<div className="row pullright">
                            <button onClick={this.refresh}>Continue</button>
                        </div>)
                    :
                        (<div></div>)
                }
            </div>
        );
    }
}

ReactDOM.render(<App data={Data.authors} />, document.querySelector('#react-container'));
