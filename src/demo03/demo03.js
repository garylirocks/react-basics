const React = require('react');
const ReactDOM = require('react-dom');
const Axios = require('axios');

const Card = (props) => {
    return (
        <div className="card">
            <img src={props.avatarUrl} />
            <div className="cardInfo">
                <div className="name">{props.userName}</div>
                <div>{props.userCompany}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map((entry) => <Card key={entry.id} {...entry} />)}
        </div>
    );
};

class Form extends React.Component {
    state = {username: ''};

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Event: Form Submit', this.state.username);

        Axios.get('https://api.github.com/users/' + this.state.username)
                .then(resp => {
                    console.log(resp);
                    this.props.handleSubmit({
                        id: resp.data.id,
                        avatarUrl: resp.data.avatar_url,
                        userName: resp.data.name,
                        userCompany: resp.data.company
                    });
                    this.setState({username: ''});
                });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value={this.state.username}
                    onChange={(e) => {this.setState({username: e.target.value})}}
                    placeholder="Github username" />
                <button type="submit">Add card</button>
            </form>
        );
    }
};

class App extends React.Component {
    state = {
        cards: [],
    };

    addNewCard = (userinfo) => {
        console.log(userinfo);
        this.setState({
            cards: this.state.cards.concat(userinfo)
        });
    };

    render() {
        return (
            <div>
                <Form handleSubmit={this.addNewCard} />
                <CardList cards={this.state.cards} />
            </div>
        );
    }
}

ReactDOM.render(<App />,
        document.querySelector('#react-container'));
