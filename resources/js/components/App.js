import React from 'react';
import { HashRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import InsQuote from './InsQuote';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            token: null
        };
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Menu isAuthenticated={this.state.isAuthenticated} logout={this.logout} />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' render={(props) => <Login authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
                        <PrivateRoute exact path='/quote' component={InsQuote} isAuthenticated={this.state.isAuthenticated} token={this.state.token} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }

    authenticate(token) {
        this.setState({
            isAuthenticated: true,
            token: token
        });
        localStorage.setItem('jwt', token);
    }

    logout() {
        this.setState({
            isAuthenticated: false,
            token: null
        });
        localStorage.clear('jwt');
    }

    componentDidMount() {
        const lsToken = localStorage.getItem('jwt');
        if (lsToken) {
            this.authenticate(lsToken);
        }
    }
}
const Menu = (props) => (
    <ul>
        <li>
            <NavLink exact activeClassName="active" to="/">
                Home
            </NavLink>
        </li>
        <li>
            <NavLink exact activeClassName="active" to="/quote">
                Quote
            </NavLink>
        </li>
        {props.isAuthenticated ?
            <li>
                <a onClick={props.logout}>
                    Log Out
                </a>
            </li>
            :
            null
        }
    </ul>
);

const PrivateRoute = ({ component: Component, isAuthenticated, token, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} />
        ) : (
            <Redirect to={ {
                pathname: '/login',
                state: { from: props.location }
            } } />
        )
    )} />
);

export default App;
