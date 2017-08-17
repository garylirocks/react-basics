const React = require('react');
const _ = require('lodash');

const Stars = (props) => {
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"></i>
            )}
        </div>
    );
};

const Answer = (props) => {
    return (
        <div className="col-5">
            {props.selected.map((number, i) =>
                <span className="number" key={i}
                        onClick={i => props.deselect(number)}
                >{number}</span>
            )}
        </div>
    );
};

const Buttons = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button =
                <button className="btn btn-success"
                        onClick={props.acceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>
            break;
        case false:
            button =
                <button className="btn btn-danger">
                    <i className="fa fa-times"></i>
                </button>
            break;
        default:
            button =
                <button className="btn"
                    disabled={props.selectedNumbers.length === 0}
                    onClick={props.checkAnswer}
                >=</button>
            break;
    }

    return (
        <div className="col-2 text-center">
            {button}
            <br />
            <br />
            <button className="btn btn-warning"
                    onClick={props.resetGame}
                    disabled={props.redraws <= 0}
                    >
                <i className="fa fa-refresh"></i> {props.redraws}
            </button>
        </div>
    )
};

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        return '';
    };

    const selectNumber = (e, number) => {
        console.log(number);
        if (props.selectedNumbers.indexOf(number) >= 0) {
            props.deselect(number);
        } else {
            props.selectNumber(number);
        }
    };

    return (
        <div className="card text-center">
            <div>
                {Numbers.list.map((number, i) =>
                    <span className={'number ' + numberClassName(number)} key={i}
                            onClick={(e) => selectNumber(e, number)}>
                        {number}
                    </span>
                )}
            </div>
        </div>
    );
};

Numbers.list = _.range(1, 10);

const DoneStatus = (props) => {
    return (
        <div className="text-center">
            <div className="result">
                {props.info}
            </div>
            <br />
            <button className="btn btn-info" onClick={props.restart}>
                Restart
            </button>
        </div>
    );
};

const CountdownClock = (props) => {
    return (
        <div>
            Time remaining: &nbsp;
            <span className="time">{props.remainingTime}</span>
        </div>
    );
};

class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    static initState = {
        selectedNumbers: [],
        numberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        redraws: 5,
        doneStatus: null,
        remainingTime: 180,
    };

    state = Game.initState;

    selectNumber = (n) => {
        if (this.state.usedNumbers.indexOf(n) >= 0) {
            return;
        }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(n)
        }));
    };

    deselectNumber = (n) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(i => (i !== n))
        }))
    };

    checkAnswer = () => {
        this.setState(prevState => ({
                    answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers
                                        .reduce((acc, n) => acc + n, 0),
            }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
                    answerIsCorrect: Game.initState.answerIsCorrect,
                    usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
                    selectedNumbers: [],
                    numberOfStars: Game.randomNumber(),
            }), this.updateDoneStatus);
    };

    resetGame = () => {
        if (this.state.redraws > 0) {
            this.setState(prevState => ({
                answerIsCorrect: null,
                selectedNumbers: [],
                numberOfStars: Game.randomNumber(),
                redraws: prevState.redraws - 1
            }), this.updateDoneStatus);
        }
    };

    restartGame = () => {
        this.setState(Game.initState);
    };

    possibleSolutions = ({numberOfStars, usedNumbers}) => {
        console.log (`finding possible solutions,
             stars: ${numberOfStars}
             used: ${usedNumbers}
             `);

        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1 && number <= numberOfStars
        );

        console.log(`posssible numbers: ${possibleNumbers}`);

        if (possibleNumbers.length === 0) {
            return false;
        }

        if (possibleNumbers.indexOf(numberOfStars) >= 0) {
            return true;
        }

        for (let e of possibleNumbers) {
            if (this.possibleSolutions({
                'numberOfStars': numberOfStars - e,
                'usedNumbers': usedNumbers.concat(e)
            })) {
                return true;
            }
        }

        return false;
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return {doneStatus: 'Done. Nice !'};
            }

            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game Over !'};
            }
        });
    };

    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <p>
                    Select numbers to make their sum matches the number of stars.
                    You got 5 chances to refresh the stars if you could not find matching
                        numbers.
                </p>
                <hr />
                <div className="row">
                    <div className="col-12 text-right">
                        <CountdownClock remainingTime={this.state.remainingTime} />
                    </div>
                </div>

                <div className="row">
                    <Stars numberOfStars={this.state.numberOfStars} />
                    <Buttons selectedNumbers={this.state.selectedNumbers}
                             checkAnswer={this.checkAnswer}
                             acceptAnswer={this.acceptAnswer}
                             answerIsCorrect={this.state.answerIsCorrect}
                             resetGame={this.resetGame}
                             redraws={this.state.redraws}
                    />
                    <Answer selected={this.state.selectedNumbers}
                            deselect={this.deselectNumber}
                    />
                </div>
                <br />
                <br />
                {this.state.doneStatus ?
                    <DoneStatus info={this.state.doneStatus}
                                restart={this.restartGame} /> :
                    <Numbers selectedNumbers={this.state.selectedNumbers}
                            selectNumber={this.selectNumber}
                            deselect={this.deselectNumber}
                            usedNumbers={this.state.usedNumbers}
                            />
                }
            </div>
        );
    }
}

module.exports = Game;
