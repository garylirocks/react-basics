import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    render() {
        let theClassName = "answer " + (this.props.selected ? " selected" : " ") + (this.props.isCorrect ? " correct" : " wrong");

        return (
            <div>
                <h4 className={theClassName} onClick={() => this.props.selectionHandler(this.props.id)}>{this.props.title}</h4>
            </div>
        );
    }
}

export default Book;
