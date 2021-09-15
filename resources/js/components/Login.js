import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        if (this.props.isAuthenticated && this.props.location.state !== undefined) {
            return (
                <Redirect to={this.props.location.state.from} />
            );
        }
        return (

                    <form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>
                        {this.state.error !== '' ?
                            <p className="text-danger">{this.state.error}</p>
                            :
                            null
                        }
                        <div className='form-group'>
                            <input
                                name='email'
                                type='email'
                                className='form-control'
                                placeholder='Email'
                                value={this.state.email}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='form-group'>
                            <input
                                name='password'
                                type='password'
                                className='form-control'
                                placeholder='Password'
                                value={this.state.password}
                                onChange={this.handleChange}/>
                        </div>
                        <div className='form-group'>
                            <input type='submit' className='btn' value='Login'/>
                        </div>
                    </form>
        );
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                this.setState({ error: '' });
                const token = response.data.token;
                this.props.authenticate(token);
            })
            .catch((error) => {
                console.log(error);
                const status = error.response.status
                if (status === 401) {
                    this.setState({ error: 'Username or password not recognized.' });
                }
            });
    }
}

export default Login;
